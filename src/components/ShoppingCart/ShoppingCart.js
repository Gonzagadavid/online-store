import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.addPrice = this.addPrice.bind(this);
    this.subPrice = this.subPrice.bind(this);
    this.sumPrice = this.sumPrice.bind(this);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    this.sumPrice();
  }

  sumPrice() {
    const { cartList } = this.props;
    const { total } = this.state;
    const sumTotal = cartList
      .map(({ price }) => price)
      .reduce((totalPrice, price) => totalPrice + price, 0);

    if (total !== sumTotal) this.setState({ total: sumTotal });
  }

  addPrice(price) {
    this.setState((prev) => ({ total: prev.total + price }));
  }

  subPrice(price) {
    this.setState((prev) => ({ total: prev.total - price }));
  }

  render() {
    const { total } = this.state;
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
              addPrice={ this.addPrice }
              subPrice={ this.subPrice }
            />))
          }
        </div>
        <p>{`Total: ${total.toFixed(2)}`}</p>
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
