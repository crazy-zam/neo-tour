import axios from 'axios';
const API = 'https://134.209.229.107:8080';

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
    // const response = await axios.get(`${API}/api/v1/tour/bycategory/${id}`);
    return [
      {
        id: 4,
        title: 'Тур в Дубай',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708619604/dglpiuew75xe2pgx1u9m.jpg',
      },
      {
        id: 8,
        title: 'Canadian Rockies And Northern Lights Tour',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708623985/ih4p6vtumfyclkcas4jd.webp',
      },
      {
        id: 27,
        title: 'Winter Family Holiday In Slovakia',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625332/q7uh5t5og2vxzgokrke8.webp',
      },
      {
        id: 28,
        title: 'Family Winter Adventure In Finland',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625363/bquipqraydc878w847jo.jpg',
      },
      {
        id: 29,
        title: 'Family Multi Activity Holiday In Finland With Santa',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625395/j4zkhrvbqzfcehhwkmf9.jpg',
      },
      {
        id: 30,
        title: 'Family Skiing Holiday In Montenegro',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625431/jxamq6jg83gjs2vtidfq.jpg',
      },
      {
        id: 31,
        title: 'Orkney Winter Walking Holiday',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625486/k5v61peaawlybeoduai8.webp',
      },
      {
        id: 32,
        title: 'Christmas Or New Year 2025 In Lapland',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625522/khbbrgxbdyszrexmotho.jpg',
      },
      {
        id: 33,
        title: 'Gastronomy And Northern Lights Holiday In Iceland',
        image:
          'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625615/ezsroafgkuewmjbuwecz.jpg',
      },
    ];
    // return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTourbyId = async (id) => {
  try {
    const response = await axios.get(`${API}/api/v1/tour/${id}`);
    return response;
    // return {
    //   id: 40,
    //   title: 'Austria Learn To Ski Or Splitboard Holiday',
    //   country: 'Austria',
    //   tourLocation: 'Austria, MoaAlm ',
    //   description:
    //     'We are remotely situated at the heart of the Austrian Alps. We believe the best way to enjoy the mountains and nature in winter is under your own steam and therefore are excited to offer our annual learn to ski tour/split board week. If you want to escape the pistes, take a more Eco friendly approach to skiing, and have a unique winter adventure, then this holiday is for you!',
    //   image:
    //     'https://res.cloudinary.com/drfnzmkqf/image/upload/v1708625921/bfprrbgtf0euoejb1kfz.jpg',
    //   category: 'Most Visited',
    //   month: ['FEBRUARY', 'MARCH', 'APRIL'],
    //   reviewsDtoList: [],
    // };
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
