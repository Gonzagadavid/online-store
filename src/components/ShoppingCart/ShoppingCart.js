import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class ShoppingCart extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <div data-testid="shopping-cart-empty-message">
        <h3>Seu carrinho está vazio</h3>
        <RiShoppingCart2Line />
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Comprar Agora</button>
        </Link>
        <p data-testid="shopping-cart-product-quantity">{ cartList.length }</p>
        <div>
          {
            cartList.map((
              { title, image, price }, index,
            ) => (<CartItem
              key={ index }
              title={ title }
              image={ image }
              price={ price }
            />))
          }
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: arrayOf(
    shape({
      title: string,
      thumbnail: string,
      id: string,
      price: number,
    }),
  ).isRequired,
};

export default ShoppingCart;
