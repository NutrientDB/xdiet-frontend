import React, { Component } from 'react';

import ProductsListItem from '../components/ProductsListItem';
import { fetchProducts } from '../modules/products';
import store from '../store';

class ProductsList extends Component {
  componentDidMount() {
    store.dispatch(fetchProducts())
  }
  render() {
    console.log(this.props.products);
    
    return (
      <div>
        <input type="text" onChange={this.props.setFilter} value={this.props.filter} />
        <p>TODO: Search bar</p>
        Products list length: {this.props.products.length}
        {this.props.products.map(product => (
          <ProductsListItem key={product._id} product={product} />))
        }
      </div>
    )
  }
}

export default ProductsList
