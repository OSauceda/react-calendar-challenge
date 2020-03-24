import { VIEW_DATE_DETAILS } from './types';

export const viewDateDetails = (date) => (dispatch) => {
  dispatch({
    type: VIEW_DATE_DETAILS,
    payload: date,
  });
};
