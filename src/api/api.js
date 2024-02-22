import axios from 'axios';
const API = 'http://134.209.229.107:8080';

export const getRecommendTours = async () => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/recommended`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscoverTours = async (id) => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/bycategory/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTourbyId = async (id) => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const bookTour = async (id, phone, countOfPeople, comments) => {
  try {
    const headers = {
      'Content-Type': 'multipart/encrypted',
    };
    const formData = new FormData();
    formData.append('phoneNumber', phone);
    formData.append('tourId', id);
    formData.append('countOfPeople', countOfPeople);
    formData.append('comment', comments);
    const response = await axios.post(`${API}/api/v1/tour/booking`, formData, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
