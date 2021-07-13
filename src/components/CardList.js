import React, { Component } from 'react';
import { string, number, arrayOf, shape, func } from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const { itemList, addItem } = this.props;
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
              addItem={ addItem }
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
  addItem: func.isRequired,
};

export default CardList;