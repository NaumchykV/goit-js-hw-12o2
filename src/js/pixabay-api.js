import axios from 'axios';
import iziToast from 'izitoast';

const URL = 'https://pixabay.com/api/';
const API_KEY = '45140381-2d1d7d148fe8b2b4910dcca17';

export default async function searchImages(query, page = 1) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    // iziToast.error({
    //   position: 'topRight',
    //   message: `${error}`,
    // });
  }
}

