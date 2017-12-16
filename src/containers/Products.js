import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchProducts, filterProducts } from '../modules/products';
import store from '../store';
import Product from './Product';
import ProductsList from './ProductsList';

class Products extends Component {
  componentDidMount() {
    store.dispatch(fetchProducts())
  }
  render() {
    const ProductsListRender = () => <ProductsList {...this.props} />
    return (
      <Switch>
        <Route exact path='/products' render={ProductsListRender} />
        <Route path='/products/:id' component={Product}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.list
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFilter: (event) => filterProducts(event.target.value || null)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
