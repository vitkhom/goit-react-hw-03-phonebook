import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      toast.warn(`${name} is already in contacts`);

      return;
    }

    if (!name || !number) {
      toast.warn(`Please enter the contact name and number`);

      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [
        ...contacts,
        {
          id: uuidv4(),
          name,
          number,
        },
      ],
    }));
  };

  handleFilterChange = ({ filter }) => {
    this.setState({
      filter,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = filter
      ? contacts.filter(contact => contact.name.includes(filter))
      : contacts;

    return filteredContacts;
  };

  handleRemoveContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  saveData = () => {
    localStorage.setItem('phonebook', JSON.stringify(this.state));
  };

  loadData = () => {
    const savedContacts = JSON.parse(localStorage.getItem('phonebook'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.saveData();
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />

        <h2>Contacts</h2>
        {contacts.length >= 2 && (
          <Filter onFilterChange={this.handleFilterChange} />
        )}

        <ContactList
          contacts={this.filterContacts()}
          onRemove={this.handleRemoveContact}
        />
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

export default App;
