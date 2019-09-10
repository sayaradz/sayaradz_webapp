import axios from "axios";

import {ORDER_LOADING, GET_ORDERS, GET_ERRORS, ACCEPT_ORDER, REJECT_ORDER} from './types'

export const acceptOrder = id => dispatch =>{
  dispatch(setOrderLoading());
  axios
  .put(`${process.env.REACT_APP_BACKEND_URL}/orders/${id}`,
    {order_status: 'ACCEPTED'}
  )
  .then(res => {return dispatch({
    type: ACCEPT_ORDER,
    payload: id
  })}
  )
}

export const rejectOrder = id => dispatch =>{
  dispatch(setOrderLoading());
  axios
  .put(`${process.env.REACT_APP_BACKEND_URL}/orders/${id}`,
    {order_status: 'REJECTED'}
  )
  .then(res => {return dispatch({
    type: REJECT_ORDER,
    payload: id
  })}
  )}

export const getOrders = () => dispatch => {
    dispatch(setOrderLoading());
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders`)
      .then(res =>{
        const orders = [];
        res.data.rows.map(order =>{
          return orders.push({
            _id: order._id,
            version: (order.version !== null)? order.version.name: "No version found",
            color: (order.color !== null && order.color !== undefined)? order.color.value: "No Color Found",
            order_date: order.order_date,
            amount: order.amount,
            status: order.order_status
          })
        })
        return dispatch({
          type: GET_ORDERS,
          payload: orders
        })
      }
      )
      .catch(err =>
        {
          console.log(err)
         return dispatch({
          type: GET_ERRORS,
          payload: null
        })
      }
      );
  };

  // Set loading state
export const setOrderLoading = () => {
    return {
      type: ORDER_LOADING
    };
  };