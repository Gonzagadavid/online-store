import React from 'react';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      email: '',
      CPF: '',
      phone: '',
      CEP: '',
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
        data-testid="checkout-fullname"
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
        data-testid="checkout-email"
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
    const { CPF } = this.state;
    return (
      <label
        data-testid="checkout-CPF"
        htmlFor="checkout-CPF"
      >
        CPF
        <input
          data-testid="checkout-CPF"
          type="text"
          id="checkout-CPF"
          value={ CPF }
          onChange={ (event) => this.handleChange(event, 'CPF') }
        />
      </label>
    );
  }

  renderPhoneInput() {
    const { phone } = this.state;
    return (
      <label
        data-testid="checkout-phone"
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
    const { CEP } = this.state;
    return (
      <label
        data-testid="checkout-CEP"
        htmlFor="checkout-CEP"
      >
        CEP
        <input
          data-testid="checkout-CEP"
          type="text"
          id="checkout-CEP"
          value={ CEP }
          onChange={ (event) => this.handleChange(event, 'CEP') }
        />
      </label>
    );
  }

  renderAddressInput() {
    const { address } = this.state;
    return (
      <label
        data-testid="checkout-address"
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
    return (
      <form>
        {this.renderFullNameInput()}
        {this.renderEmailInput()}
        {this.renderCPFInput()}
        {this.renderPhoneInput()}
        {this.renderCEPInput()}
        {this.renderAddressInput()}
      </form>
    );
  }
}

export default Checkout;
