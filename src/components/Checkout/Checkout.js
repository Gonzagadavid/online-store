import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
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

  renderFullNameInput() {
    const { fullname } = this.state;
    return (
      <label
        data-testid="checkout-fullname-label"
        htmlFor="checkout-fullname"
      >
        Nome Completo
        <input
          data-testid="checkout-fullname"
          type="text"
          id="checkout-fullname"
          value={ fullname }
          onChange={ (event) => this.handleChange(event, 'fullname') }
        />
      </label>
    );
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <label
        data-testid="checkout-email-label"
        htmlFor="checkout-email"
      >
        Email
        <input
          data-testid="checkout-email"
          type="text"
          id="checkout-email"
          value={ email }
          onChange={ (event) => this.handleChange(event, 'email') }
        />
      </label>
    );
  }

  renderCPFInput() {
    const { cpf } = this.state;
    return (
      <label
        data-testid="checkout-cpf-label"
        htmlFor="checkout-cpf"
      >
        CPF
        <input
          data-testid="checkout-cpf"
          type="text"
          id="checkout-cpf"
          value={ cpf }
          onChange={ (event) => this.handleChange(event, 'cpf') }
        />
      </label>
    );
  }

  renderPhoneInput() {
    const { phone } = this.state;
    return (
      <label
        data-testid="checkout-phone-label"
        htmlFor="checkout-phone"
      >
        Telefone
        <input
          data-testid="checkout-phone"
          type="text"
          id="checkout-phone"
          value={ phone }
          onChange={ (event) => this.handleChange(event, 'phone') }
        />
      </label>
    );
  }

  renderCEPInput() {
    const { cep } = this.state;
    return (
      <label
        data-testid="checkout-cep-label"
        htmlFor="checkout-cep"
      >
        CEP
        <input
          data-testid="checkout-cep"
          type="text"
          id="checkout-cep"
          value={ cep }
          onChange={ (event) => this.handleChange(event, 'cep') }
        />
      </label>
    );
  }

  renderAddressInput() {
    const { address } = this.state;
    return (
      <label
        data-testid="checkout-address-label"
        htmlFor="checkout-address"
      >
        Endereço
        <input
          data-testid="checkout-address"
          type="text"
          id="checkout-address"
          value={ address }
          onChange={ (event) => this.handleChange(event, 'address') }
        />
      </label>
    );
  }

  render() {
    const { cartList } = this.props;
    return (
      <div>
        <div>
          {
            cartList.map((
              { title, image, price }, index,
            ) => (<CartItem
              key={ index }
              title={ title }
              image={ image }
              price={ price }
            />))
          }
        </div>
        <form>
          {this.renderFullNameInput()}
          {this.renderEmailInput()}
          {this.renderCPFInput()}
          {this.renderPhoneInput()}
          {this.renderCEPInput()}
          {this.renderAddressInput()}
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
};

export default Checkout;
