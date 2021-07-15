import React, { Component } from 'react';
import { string, number, func } from 'prop-types';

import '../Main/CardList/Card.css';
import { TiDelete } from 'react-icons/ti';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.handlerQty = this.handlerQty.bind(this);
    this.availableQuantity = this.availableQuantity.bind(this);
    this.state = {
      quantity: props.quantity,
      available: props.available,
    };
  }

  handlerQty({ target }, id) {
    const { name } = target;
    const { quantity, available } = this.state;
    const { setQuantity } = this.props;
    const min = quantity === 1 && name === 'sub';
    const max = quantity === available && name === 'add';
    const value = name === 'add' ? quantity + 1 : quantity - 1;
    this.setState({ quantity: min ? 1 : value }, () => {
      const { state } = this;
      setQuantity(state.quantity, id);
    });
    this.setState({ quantity: max ? available : value }, () => {
      const { state } = this;
      setQuantity(state.quantity, id);
    });
  }

  availableQuantity(event) {
    const { value } = event.target;
    this.setState({ available: value });
  }

  render() {
    const { title, image, price, removeItem, id, available } = this.props;
    const { quantity } = this.state;
    console.log(available);
    return (
      <div className="Card" data-testid="product">
        <button type="button" onClick={ () => removeItem(id) }>
          Remove
          <TiDelete />
        </button>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
        <number>
          {available}
        </number>
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
  id: string,
  image: string.isRequired,
  price: number.isRequired,
  setQuantity: func.isRequired,
  quantity: number.isRequired,
  removeItem: func.isRequired,
  available: number.isRequired,
};

CartItem.defaultProps = {
  id: 'not found',
};

export default CartItem;
