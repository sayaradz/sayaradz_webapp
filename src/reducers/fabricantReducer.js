import {
  ADD_FABRICANT,
  GET_FABRICANTS,
  GET_FABRICANT,
  UPDATE_FABRICANT,
  DELETE_FABRICANT,
  FABRICANT_LOADING
} from '../actions/types';

const initialState = {
  fabricants: [],
  fabricant: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FABRICANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FABRICANTS:
      return {
        ...state,
        fabricants: action.payload,
        loading: false
      };
    case GET_FABRICANT:
      return {
        ...state,
        fabricant: action.payload,
        loading: false
      };
    case UPDATE_FABRICANT:
      return {
        ...state,
        fabricants: [action.payload, ...state.fabricants.filter(fabricant => fabricant._id !== action.payload._id)]
      };
    case ADD_FABRICANT:
      return {
        ...state,
        fabricants: [action.payload, ...state.fabricants]
      };
    case DELETE_FABRICANT:
      return {
        ...state,
        fabricants: state.fabricants.filter(fabricant => fabricant._id !== action.payload)
      };
    default:
      return state;
  }
}
