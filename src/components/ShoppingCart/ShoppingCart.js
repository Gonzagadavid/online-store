import React from 'react';
import { string, number, arrayOf, shape, func } from 'prop-types';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

import '../Main/Main.css';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.sumPrice = this.sumPrice.bind(this);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    this.sumPrice();
  }

  componentDidUpdate() {
    this.sumPrice();
  }

  sumPrice() {
    const { total } = this.state;
    const { cartList } = this.props;
    const sumTotal = cartList
      .map(({ price, quantity }) => price * quantity)
      .reduce((totalPrice, price) => totalPrice + price, 0);

    if (total !== sumTotal) this.setState({ total: sumTotal });
  }

  render() {
    const { total } = this.state;
    const { cartList, removeItem, setQuantity } = this.props;
    return (
      <div data-testid="shopping-cart-empty-message" className="Main-container">
        <h3>Seu carrinho está vazio</h3>
        <RiShoppingCart2Line />
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Comprar Agora</button>
        </Link>
        <p>{`Total: ${total.toFixed(2)}`}</p>
        <main>
          {
            cartList.map((
              { title, image, price, id, quantity }, index,
            ) => (<CartItem
              key={ index }
              title={ title }
              image={ image }
              price={ price }
              setQuantity={ setQuantity }
              id={ id }
              quantity={ quantity }
              removeItem={ removeItem }
            />))
          }
        </main>
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
  removeItem: func.isRequired,
  setQuantity: func.isRequired,
};

export default ShoppingCart;
