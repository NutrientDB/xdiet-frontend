import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './ProductsListItem.scss'

class ProductsListItem extends Component {
  state = {
    isNutrientsShow: false,
    nutrients: this.props.product.nutrients.slice(0, 3)
  }

  triggerMode() {
    this.setState(prev => ({
      ...prev,
      isNutrientsShow: !prev.isNutrientsShow,
      nutrients: !prev.isNutrientsShow
        ? this.props.product.nutrients.slice()
        : this.props.product.nutrients.slice(0, 3)
    }))
    console.log(this.state.nutrients)
  }

  render() {
    const triggerMode = this.triggerMode.bind(this)
    return (
      <div>
        <div className="product-list-name">{this.props.product.name.long_ru}</div>
        {this.state.nutrients.map(nutrient =>
          <Nutrient key={nutrient.code} {...nutrient} />)
        }
        <button onClick={triggerMode} hidden={this.state.isNutrientsShow}>Show all</button>
      </div>
    )
  }
}

const Nutrient = nutrient => (
  <span className="product-list-nutirent">({nutrient.name} - {nutrient.value})</span>
)

export default ProductsListItem
