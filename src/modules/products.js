import { throttle } from 'lodash-es';
export const FETCH = 'products/FETCH';
export const FETCH_BY_ID = 'products/FETCH_BY_ID';
export const FETCH_SUCCESS = 'products/FETCH_SUCCESS';
export const FETCH_ERROR = 'products/FETCH_ERROR';
export const FILTER = 'product/FILTER';

const initialState = {
  isRequesting: false,
  errorMessage: null,
  list: [],
  byId: {},
  filter: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isRequesting: true
      }
    case FETCH_BY_ID:
      return {
        ...state,
        isRequesting: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        list: action.payload,
        byId: action.payload.reduce((products, product) => ({ ...products, [product.id]: product }), {})
      }
    case FETCH_ERROR:
      return {
        ...state,
        isRequesting: false,
        errorMessage: action.payload
      }
    case FILTER:
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state;
  }
}

export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH });
    const state = getState().products;
    console.log(state.filter);
    fetchApiProducts(dispatch)
      .then((result) => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: result
        })
      })
  }
}

export const filterProducts = throttle((filter) => {
  console.log('triggered!', filter)
  return (dispatch) => {
    dispatch({ type: FILTER, payload: filter })
    fetchApiProducts(dispatch, {filter})
      .then((result) => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: result
        })
      })
  }
}, 100)

function fetchApiProducts(dispatch, params) {
  const filterEmptyParams = ([param, value]) => !!value
  const paramValuePairs = Object.entries(params || {}).filter(filterEmptyParams);
  const urlParams = new URLSearchParams(paramValuePairs)
  return fetch(`http://localhost:3004/nutrients/${urlParams && '?' + urlParams}`)
    .then((response) => response.json())
    .catch((error) => {
      dispatch({
        type: FETCH_ERROR,
        payload: error
      })
    })
}
