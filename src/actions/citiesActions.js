import { GET_ALL_CITIES } from './types';

export const getCities = () => (dispatch) => {
  dispatch({
    type: GET_ALL_CITIES,
  });
};
