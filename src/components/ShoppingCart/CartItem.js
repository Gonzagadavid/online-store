import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import '../Main/CardList/Card.css';
import { TiDelete } from 'react-icons/ti';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.handlerQty = this.handlerQty.bind(this);
    this.state = {
      quantity: props.quantity,
    };
  }

  handlerQty({ target }, id) {
    const { name } = target;
    const { quantity } = this.state;
    const { setQuantity } = this.props;
    const min = quantity === 1 && name === 'sub';
    const value = name === 'add' ? quantity + 1 : quantity - 1;
    this.setState({ quantity: min ? 1 : value }, () => {
      const { state } = this;
      setQuantity(state.quantity, id);
    });
  }

  render() {
    const { title, image, price, removeItem, id } = this.props;
    const { quantity } = this.state;
    return (
      <div className="Card" data-testid="product">
        <button type="button" onClick={ () => removeItem(id) }>
          Remove
          <TiDelete />
        </button>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
        <button
          type="button"
          onClick={ (event) => this.handlerQty(event, id) }
          name="sub"
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">
          { quantity }
        </span>
        <button
          type="button"
          onClick={ (event) => this.handlerQty(event, id) }
          name="add"
          data-testid="product-increase-quantity"
        >
          +
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: string.isRequired,
  id: string.isRequired,
  image: string.isRequired,
  price: number.isRequired,
  setQuantity: func.isRequired,
  quantity: number.isRequired,
  removeItem: func.isRequired,
};

export default CartItem;
