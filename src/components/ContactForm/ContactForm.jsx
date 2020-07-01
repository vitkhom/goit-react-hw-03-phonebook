import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  hendleSubmit = e => {
    e.preventDefault();

    this.props.onAdd(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  hendleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.hendleSubmit}>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.hendleInputChange}
        />
        <h3>Number</h3>
        <input
          type="text"
          name="number"
          value={number}
          onChange={this.hendleInputChange}
        />
        <button className="addButton" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
