import React from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div data-testid="shopping-cart-empty-message">
        <h3>Seu carrinho está vazio</h3>
        <RiShoppingCart2Line />
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Comprar Agora</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
