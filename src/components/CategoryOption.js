import React, { Component } from 'react';
import { string, func } from 'prop-types';
import './CategoryOption.css';

class CategoryOption extends Component {
  render() {
    const { name, id, handler } = this.props;
    return (
      <label htmlFor={ id } className="CategoryOption">
        <input
          type="radio"
          id={ id }
          name="category"
          data-testid="category"
          onChange={ handler }
        />
        {name}
      </label>);
  }
}

CategoryOption.propTypes = {
  name: string.isRequired,
  handler: func.isRequired,
  id: string.isRequired,
};

export default CategoryOption;
