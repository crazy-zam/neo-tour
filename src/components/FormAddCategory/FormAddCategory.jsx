import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
const API = 'https://devilish-badge-production.up.railway.app';
const headers = {
  'Content-Type': 'application/json',
};
export const addCategory = async (data, head) => {
  try {
    const response = await axios.post(`${API}/api/v1/admin/category`, data, {
      headers: head,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const FormAddCategory = () => {
  return (
    <div>
      <h2>Add Cateegory</h2>
      <Formik
        initialValues={{ category: '' }}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append('title', values.category);
          addCategory(formData, headers);
          //  console.log(JSON.stringify(Object.fromEntries(formData)));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.category}
              name="category"
            />

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddCategory;
