import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductsListItem from '../components/ProductsListItem';

const ProductsList = props => (
  <div>
    <input type="text" onChange={props.setFilter} />
    <p>TODO: Search bar</p>
    Products list length: { props.products.length }

    { props.products.map(product => (
        <ProductsListItem key={product._id} product={product} />))
    }
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(null, mapDispatchToProps)(ProductsList)
