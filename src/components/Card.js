import React, { Component } from 'react';
import { string, number } from 'prop-types';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { title, imagePath, price } = this.props;
    const image = imagePath.replace(/-I.jpg/g, '-O.jpg');

    return (
      <div className="Card" data-testid="product">
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.increment }
        >
          Adicionar ao Carrinho
        </button>
      </div>

    );
  }
}

Card.propTypes = {
  title: string.isRequired,
  imagePath: string.isRequired,
  price: number.isRequired,
};

export default Card;
