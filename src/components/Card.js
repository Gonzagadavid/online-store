import React, { Componte } from 'react';
import PropTypes from 'prop-types';

class Card extends component {
  render() {
    const { products } = this.props;
    const { title, imagePath, price } = products;

    return (
      <div>
        <input data-testid="query-input" />
        <input data-testid="query-button" />
        <div>
          <h3 data-testid="product">{ title }</h3>
          <img data-testid="product" src={ imagePath } alt={ title } />
          <p data-testid="product">{ price }</p>
        </div>
      </div>

    );
  }
}

export default Card;
