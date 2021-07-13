import React, { Component } from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const { itemList } = this.props;
    return (
      <main>
        {
          itemList.length
            ? itemList.map((
              { title, price, thumbnail, id },
            ) => (<Card
              title={ title }
              key={ id }
              imagePath={ thumbnail }
              price={ price }
            />))
            : <p>Nenhum produto foi encontrado</p>
        }
      </main>
    );
  }
}

CardList.propTypes = {
  itemList: arrayOf(
    shape({
      title: string,
      thumbnail: string,
      id: string,
      price: number,
    }),
  ).isRequired,
};

export default CardList;
