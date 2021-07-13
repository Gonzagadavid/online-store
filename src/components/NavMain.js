import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import CategoryOption from './CategoryOption';

class NavMain extends Component {
  render() {
    const { categoriesList, handler } = this.props;
    return (
      <nav>
        <ul>
          {categoriesList.map((
            { id, name },
          ) => (<CategoryOption
            id={ id }
            name={ name }
            key={ id }
            handler={ handler }
          />))}
        </ul>
      </nav>
    );
  }
}

NavMain.propTypes = {
  categoriesList: arrayOf(
    shape({
      name: string,
      id: string,
    }),
  ).isRequired,
  handler: func.isRequired,
};

export default NavMain;
