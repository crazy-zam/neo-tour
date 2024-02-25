import { Formik } from 'formik';
import axios from 'axios';

const API = 'https://devilish-badge-production.up.railway.app';

const headers = {
  'Content-Type': 'multipart/form-data',
};

export const addTour = async (data, head) => {
  try {
    const response = await axios.post(`${API}/api/v1/admin/tour`, data, {
      headers: head,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const FormAddTour = () => {
  return (
    <div>
      <h2>Add Tour</h2>
      <Formik
        initialValues={{
          category: '',
          country: '',
          description: '',
          title: '',
          tourLocation: '',
          month: [],
          file: '',
        }}
        onSubmit={async (values, actions) => {
          const formData = new FormData();
          const obj = {};
          let file;
          Object.entries(values).forEach(([key, val]) => {
            if (key === 'file') {
              file = val;
              return;
            }
            if (key === 'month') {
              obj[key] = val.split(/\s+/);
              return;
            }
            obj[key] = val;
          });
          const json = ` {
          "title": "${obj.title}",
          "country": "${obj.country}",
          "tourLocation": "${obj.tourLocation}",
          "description": "${obj.description}",
          "category": ${obj.category},
          "month": [${obj.month}]
        }`;
          formData.append('request', json);
          formData.append('file', file, file.name);
          console.log(json);
          await addTour(formData, headers);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>category</div>
            <select
              onChange={props.handleChange}
              value={props.values.category}
              name="category"
            >
              <option value="" label="Select a category"></option>
              <option value="1" label="Popular"></option>
              <option value="2" label=" Featured"></option>
              <option value="3" label="Most Visited"></option>
              <option value="4" label="Europe"></option>
              <option value="5" label="Asia"></option>
            </select>
            <div>country</div>
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.country}
              name="country"
            />
            <div>title</div>
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.title}
              name="title"
            />
            <div>description</div>
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.description}
              name="description"
            />
            <div>tourLocation</div>
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.tourLocation}
              name="tourLocation"
            />
            <div>{'months (заполнять через пробел)'}</div>
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.month}
              name="month"
            />
            <div>file</div>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(event) => {
                props.setFieldValue('file', event.currentTarget.files[0]);
              }}
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddTour;
