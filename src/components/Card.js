import React, { Component } from 'react';
import { string, number } from 'prop-types';
import './Card.css';

class Card extends Component {
  render() {
    const { title, imagePath, price } = this.props;
    const image = imagePath.replace(/-I.jpg/g, '-O.jpg');

    return (
      <div className="Card" data-testid="product">
        <h3>{ title }</h3>
        <img src={ image } alt={ title } />
        <p>{ `R$: ${price.toFixed(2)}` }</p>
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
