import { VIEW_DATE_DETAILS } from '../actions/types';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEW_DATE_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
