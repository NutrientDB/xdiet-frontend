import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ProductsListItem.scss'

class ProductsListItem extends Component {
  state = {
    isNutrientsShow: false,
    nutrients: this.props.product.nutrients.slice(0, 3)
  }

  triggerNutrientsShow() {
    this.setState(prev => ({
      ...prev,
      isNutrientsShow: !prev.isNutrientsShow,
      nutrients: !prev.isNutrientsShow
        ? this.props.product.nutrients.slice()
        : this.props.product.nutrients.slice(0, 3)
    }))
  }

  render() {
    const triggerNutrientsShow = this.triggerNutrientsShow.bind(this)
    const product = this.props.product
    const linkToProduct = (id) => this.props.linkToProduct.bind(this, id)

    return (
      <div>
        <div className="product-list-name">
          <a href={"/products/" + product._id} onClick={linkToProduct(product._id)}>{product.name.long_ru}</a>
        </div>
        {this.state.nutrients.map(nutrient =>
          <Nutrient key={nutrient.code} {...nutrient} />)
        }
        <button onClick={triggerNutrientsShow} hidden={this.state.isNutrientsShow}>Show all</button>
        <button onClick={triggerNutrientsShow} hidden={!this.state.isNutrientsShow}>Close all</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  linkToProduct: (id, event) => {
    event.preventDefault()
    return push('/products/' + id)
  }
}, dispatch)

const Nutrient = nutrient => (
  <span className={"product-list-nutirent product-list-nutrient-" + nutrient.code}>({nutrient.name} - {nutrient.value})</span> 
)

export default connect(null, mapDispatchToProps)(ProductsListItem)
