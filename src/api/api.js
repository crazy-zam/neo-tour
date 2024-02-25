import axios from 'axios';
// const API = 'https://e63d4bfd940d800e.mokky.dev';
const API = 'https://devilish-badge-production.up.railway.app';

export const getRecommendTours = async () => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/recommended`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscoverTours = async (id) => {
  try {
    const obj = {
      1: 'popular',
      2: 'featured',
      3: 'mostVisited',
      4: 'europe',
      5: 'asia',
    };
    const response = await axios.get(`${API}/api/v1/tour/bycategory/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTourbyId = async (id) => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/${id}`);
    return response.data[0];
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
