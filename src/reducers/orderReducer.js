import {GET_ORDERS, ORDER_LOADING, ACCEPT_ORDER, REJECT_ORDER} from '../actions/types';

const initialState = {
    orders: [],
    loading: false
  };

  export default (state = initialState, action) => {
    var newOrders = []
      switch(action.type){
        case ORDER_LOADING:
                return {
                  ...state,
                  loading: true
                };
        case GET_ORDERS :
            return {
                ...state,
                orders: action.payload,
                loading: false
              };
        case ACCEPT_ORDER:
          newOrders = [];
          state.orders.map(elem => {
            if(elem._id === action.payload)
              elem.status = "ACCEPTED"
            return newOrders.push(elem)
          })
          return {
            orders: newOrders,
            loading: false
          }
          case REJECT_ORDER:
            newOrders = [];
          state.orders.map(elem => {
            if(elem._id === action.payload)
              elem.status = "REJECTED"
            return newOrders.push(elem)
          })
          return {
            orders: newOrders,
            loading: false
          }
        default:
            return state

      }
  }