import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { filterProducts } from '../modules/products';
import Product from './Product';
import ProductsList from './ProductsList';

const Products = props => (
  <Switch>
    <Route exact path='/products' render={() => <ProductsList {...props} />} />
    <Route path='/products/:id' render={(match) => <Product {...props} {...match} />} />
  </Switch>
)

const mapStateToProps = state => ({
  products: state.products.list,
  filter: state.products.filter
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFilter: (event) => filterProducts(event.target.value || null)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
