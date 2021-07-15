import React, { Component } from 'react';
import { shape, string, func, number } from 'prop-types';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../../services/api';

import Rating from './Rating';

class ProductDetails extends Component {
  constructor() {
    super();
    this.apiItem = this.apiItem.bind(this);
    this.state = {
      item: {
        price: 0,
        thumbnail: '-I.jpg',
        attributes: [],
      },
    };
  }

  componentDidMount() {
    this.apiItem();
  }

  async apiItem() {
    const { match } = this.props;
    const { id, category, query } = match.params;
    const categoryItem = category === '0' ? false : category;
    const queryItem = query === '0' ? false : query;
    const itens = await getProductsFromCategoryAndQuery(categoryItem, queryItem);
    const itemFind = itens.results.find((item) => item.id === id);
    this.setState({ item: itemFind });
  }

  render() {
    const { item } = this.state;
    const { addItemCart, match, cartQty } = this.props;
    const { id, freeShipping } = match.params;
    const { title, price, thumbnail, attributes } = item;
    const image = thumbnail.replace(/-I.jpg/g, '-O.jpg');
    return (
      <main>
        <Link to="/">HOME</Link>
        <h3
          data-testid="product-detail-name"
        >
          { `${title} - R$ ${price.toFixed(2)}` }
          {freeShipping === 'true'
            ? <p data-testid="free-shipping">Frete Grátis</p> : <br />}

        </h3>
        <div>
          <img src={ image } alt={ title } />
        </div>
        <div>
          <ul>
            { attributes.map((
              attribute, index,
            ) => (
              <li key={ index }>
                { `${attribute.name}: ${attribute.value_name}` }
              </li>)) }
          </ul>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => addItemCart({ title, image, price }) }
          >
            Adicionar  ao  Carrinho
          </button>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <span data-testid="shopping-cart-size">{cartQty}</span>
            <RiShoppingCart2Line />
          </Link>
        </div>
        <Rating id={ id } />
      </main>
    );
  }
}

ProductDetails.propTypes = {
  match: shape({
    params: shape({
      id: string,
      category: string,
      query: string,
      freeShipping: string,
    }),
  }).isRequired,
  addItemCart: func.isRequired,
  cartQty: number.isRequired,
};

export default ProductDetails;
