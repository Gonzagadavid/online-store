import React, { Component } from 'react';
import { string, number } from 'prop-types';
import '../Main/CardList/Card.css';

class CartItem extends Component {
  render() {
    const { title, image, price } = this.props;

    return (
      <div className="Card" data-testid="product">
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: string.isRequired,
  image: string.isRequired,
  price: number.isRequired,
};

export default CartItem;
