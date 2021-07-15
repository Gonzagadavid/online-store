import React from 'react';
import { string, number, arrayOf, shape, func } from 'prop-types';
import CartItem from '../ShoppingCart/CartItem';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, inputName) {
    this.setState({
      [inputName]: event.target.value,
    });
  }

  renderInput(inputName, labelText) {
    const estado = this.state;
    const inputN = estado[inputName];
    return (
      <label
        data-testid={ `checkout-${inputName}-label` }
        htmlFor={ `checkout-${inputName}` }
      >
        { labelText }
        <input
          data-testid={ `checkout-${inputName}` }
          type="text"
          id={ `checkout-${inputName}` }
          value={ inputN }
          onChange={ (event) => this.handleChange(event, inputName) }
        />
      </label>
    );
  }

  render() {
    const { cartList, removeItem, setQuantity } = this.props;
    return (
      <div>
        <div>
          {
            cartList.map((
              { title, image, price, id, quantity }, index,
            ) => (<CartItem
              key={ index }
              title={ title }
              image={ image }
              price={ price }
              id={ id }
              quantity={ quantity }
              removeItem={ removeItem }
              setQuantity={ setQuantity }
            />))
          }
        </div>
        <form>
          {this.renderInput('fullname', 'Nome')}
          {this.renderInput('email', 'Email')}
          {this.renderInput('cpf', 'CPF')}
          {this.renderInput('phone', 'Telefone')}
          {this.renderInput('cep', 'CEP')}
          {this.renderInput('address', 'Endereço')}
        </form>
        <div>
          <p>Total: R$</p>
          {cartList.reduce((a, b) => a + (b.price || 0), 0)}
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: arrayOf(
    shape({
      title: string,
      thumbnail: string,
      id: string,
      price: number,
    }),
  ).isRequired,
  removeItem: func.isRequired,
  setQuantity: func.isRequired,
};

export default Checkout;
