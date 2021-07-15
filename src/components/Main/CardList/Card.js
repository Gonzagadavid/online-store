import React, { Component } from 'react';
import { string, number, func, bool } from 'prop-types';
import { Link } from 'react-router-dom';
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
    const {
      title, imagePath, price, addItem, category, query, idItem, freeShipping,
    } = this.props;
    const image = imagePath.replace(/-I.jpg/g, '-O.jpg');
    return (
      <div className="Card" data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/details/${idItem}/${category || '0'}/${query || '0'}/${freeShipping}` }
        >
          <div>
            <h3>{ title }</h3>
            <img src={ image } alt={ title } />
            <p>{ `R$: ${price.toFixed(2)}` }</p>
            {freeShipping ? <h4 data-testid="free-shipping">Frete Grátis</h4> : <br />}
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addItem({ title, image, price, id: idItem }) }
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
  addItem: func.isRequired,
  idItem: string.isRequired,
  category: string.isRequired,
  query: string.isRequired,
  freeShipping: bool.isRequired,

};

export default Card;
