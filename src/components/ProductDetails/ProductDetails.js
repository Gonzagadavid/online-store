import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
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
    const categoryItem = category === 'off' ? false : category;
    const queryItem = query === 'off' ? false : query;
    const itens = await getProductsFromCategoryAndQuery(categoryItem, queryItem);
    const itemFind = itens.results.find((item) => item.id === id);
    this.setState({ item: itemFind });
  }

  render() {
    const { item } = this.state;
    const { addItemCart, match } = this.props;
    const { id } = match.params;
    const { title, price, thumbnail, attributes } = item;
    const image = thumbnail.replace(/-I.jpg/g, '-O.jpg');
    return (
      <main>
        <h3
          data-testid="product-detail-name"
        >
          { `${title} - R$ ${price.toFixed(2)}` }

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
    }),
  }).isRequired,
  addItemCart: func.isRequired,
};

export default ProductDetails;
