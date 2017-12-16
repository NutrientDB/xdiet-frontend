import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Product = props => (
  <div class="product">
    {props.match.params.id}
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  
})

export default connect(
  null,
  mapDispatchToProps
)(Product)
