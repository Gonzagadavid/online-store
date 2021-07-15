import React, { Component } from 'react';
import { func, number } from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import './Main.css';
import NavMain from './Nav/NavMain';
import HeaderMain from './Header/HeaderMain';
import CardList from './CardList/CardList';
//
class Main extends Component {
  constructor() {
    super();
    this.apiCategories = this.apiCategories.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerCategory = this.handlerCategory.bind(this);
    this.apiItems = this.apiItems.bind(this);
    this.state = {
      categoriesList: [],
      query: '',
      category: '',
      itemList: [],
    };
  }

  componentDidMount() {
    this.apiCategories();
  }

  handlerInput(event) {
    const { value } = event.target;
    this.setState({ query: value });
  }

  handlerCategory(event) {
    const { id } = event.target;
    this.setState({ category: id }, () => {
      this.apiItems();
    });
  }

  async apiItems() {
    const { query, category } = this.state;
    const items = await getProductsFromCategoryAndQuery(category, query);
    const { results } = items;
    this.setState({ itemList: results });
  }

  async apiCategories() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  }

  render() {
    const { categoriesList, query, itemList, cartList, category } = this.state;
    const { addItemCart, cartQty } = this.props;
    return (
      <div className="Main">
        <NavMain categoriesList={ categoriesList } handler={ this.handlerCategory } />
        <div className="Main-container">
          <HeaderMain
            query={ query }
            handlerInput={ this.handlerInput }
            api={ this.apiItems }
            cartList={ cartList }
            cartQty={ cartQty }
          />
          <CardList
            itemList={ itemList }
            addItem={ addItemCart }
            category={ category }
            query={ query }
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  addItemCart: func.isRequired,
  cartQty: number.isRequired,
};

export default Main;
