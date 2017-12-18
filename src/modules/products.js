export const FETCH = 'products/FETCH';
export const FETCH_BY_ID = 'products/FETCH_BY_ID';
export const FETCH_SUCCESS = 'products/FETCH_SUCCESS';
export const FETCH_ERROR = 'products/FETCH_ERROR';
export const FILTER = 'products/FILTER';

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
        byId: action.payload.reduce((products, product) =>
          ({ ...products, [product._id]: product }),
          {...state.byId}
        )
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
    fetchApiProducts(dispatch, { filter: state.filter })
      .then(products => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: products
        })
      })
  }
}

export const filterProducts = (filter) => {
  return (dispatch) => {
    dispatch({ type: FILTER, payload: filter })
    dispatch(fetchProducts())
  }
}

export const fetchProductById = function(id) {
  return dispatch => {
    dispatch({ type: FETCH_BY_ID })
    fetchApiProducts(dispatch, { id })
      .then(product => dispatch({
        type: FETCH_SUCCESS,
        payload: product
      }))
  }
}

function fetchApiProducts(dispatch, params = {}) {
  const filterEmptyParams = ([param, value]) => !!value
  const paramValuePairs = Object.entries(params).filter(filterEmptyParams)
  const urlParams = new URLSearchParams(paramValuePairs)
  const urlParamsString = paramValuePairs.length ? '?' + urlParams : ''
  return fetch(`http://localhost:3004/nutrients/${urlParamsString}`)
    .then((response) => response.json())
    .catch((error) => {
      dispatch({
        type: FETCH_ERROR,
        payload: error
      })
    })
}
