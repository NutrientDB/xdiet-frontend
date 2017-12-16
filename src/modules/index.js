import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import products from './products';

export default combineReducers({
  routing: routerReducer,
  products
})
