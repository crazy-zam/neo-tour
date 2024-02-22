import { Formik } from 'formik';
import axios from 'axios';

const API = 'http://http://134.209.229.107:8080';

const headersJSON = {
  'Content-Type': 'application/json',
};
const headersEncrypted = {
  'Content-Type': 'multipart/encrypted',
};
export const addTour = async (data, head) => {
  try {
    const response = await axios.post(`${API}/api/v1/admin/tour`, data, {
      headers: head,
    });
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
        onSubmit={(values, actions) => {
          const formDataJSON = new FormData();
          const formDataFile = new FormData();
          Object.entries(values).forEach(([key, val]) => {
            if (key === 'file') {
              formDataFile.append('file', val, val.name);
              return;
            }
            if (key === 'month') {
              formDataJSON.append(key, val.split(/\s+/));
              return;
            }
            formDataJSON.append(key, val);
          });

          // for (var pair of formDataJSON.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          // for (var pair of formDataFile.entries()) {
          //   console.log(pair[1]);
          // }
          addTour(formDataJSON, headersJSON);
          addTour(formDataFile, headersEncrypted);

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
              <option value="0" label="Popular"></option>
              <option value="1" label=" Featured"></option>
              <option value="2" label="Most Visited"></option>
              <option value="3" label="Europe"></option>
              <option value="4" label="Asia"></option>
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
