import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import '../Main/CardList/Card.css';

class CartItem extends Component {
  constructor() {
    super();
    this.handlerQty = this.handlerQty.bind(this);
    this.state = {
      quantity: 1,
    };
  }

  handlerQty({ target }, callback, price) {
    const { name } = target;
    const { quantity } = this.state;
    const min = quantity === 1 && name === 'sub';
    const value = name === 'add' ? quantity + 1 : quantity - 1;
    this.setState({ quantity: min ? 1 : value });
    if (!min) callback(price);
  }

  render() {
    const { title, image, price, addPrice, subPrice } = this.props;
    const { quantity } = this.state;
    return (
      <div className="Card" data-testid="product">
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
        <button
          type="button"
          onClick={ (event) => this.handlerQty(event, subPrice, price) }
          name="sub"
        >
          -
        </button>
        <input type="number" value={ quantity } />
        <button
          type="button"
          onClick={ (event) => this.handlerQty(event, addPrice, price) }
          name="add"
        >
          +
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: string.isRequired,
  image: string.isRequired,
  price: number.isRequired,
  subPrice: func.isRequired,
  addPrice: func.isRequired,
};

export default CartItem;
