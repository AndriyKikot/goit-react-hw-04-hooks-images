import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const API_KEY = '18773042-c85a376c8239f0d185771db9c';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
};

const fetchImages = async ({ query = '', page = 1, pageSize = 15 }) => {
  try {
    const { data } = await axios.get(
      `?q=${query}&page=${page}&per_page=${pageSize}`,
    );
    return data.hits;
  } catch (error) {
    toast.error('Failed to connect to server');
    return [];
  }
};

fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImages;
