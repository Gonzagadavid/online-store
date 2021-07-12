import React from 'react';
import RiShoppingCart2Line from 'react-icons/ri';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div data-testid="shopping-cart-empty-message">
        <h3>Seu carrinho está vazio</h3>
        <RiShoppingCart2Line />
      </div>
    );
  }
}
