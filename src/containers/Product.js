import { fetchProductById } from '../modules/products';
import store from '../store';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {
  id = this.props.match.params.id
  componentDidMount() {
    store.dispatch(fetchProductById(this.id))
  }
  render() {
    const product = this.props.products.byId[this.id]
    if (!product) return null

    return (
      <div className="product">
        Product: {product.name.long}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(
  mapStateToProps,
  null
)(Product)
