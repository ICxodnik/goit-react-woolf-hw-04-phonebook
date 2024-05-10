import css from 'components/PhoneBook/index.module.css';
import React, { useEffect, useState } from 'react';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { Form } from 'components/Form';

function getSavedContacts() {
  const string = localStorage.getItem('contacts');
  const contacts = string ? JSON.parse(string) : [];
  return contacts;
}

export const PhoneBook = () => {
  const [contacts, setContacts] = useState(getSavedContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = user => {
    if (
      contacts.some(
        exUser => exUser.name.toLowerCase() === user.name.toLowerCase()
      )
    ) {
      alert(`${user.name} is already in contacts.`);
      return false;
    }

    setFilter('');
    setContacts([...contacts, user]);
    return true;
  };

  const handleFilter = value => {
    setFilter(value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(user => user.id !== id));
  };

  function getFilteredData() {
    let stringFilter = filter.toLowerCase().trim();
    if (!stringFilter) {
      return contacts;
    }
    return contacts.filter(el => el.name.toLowerCase().includes(stringFilter));
  }

  return (
    <div className={css.phonebook}>
      <h1>Phonebook</h1>
      <Form onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} value={filter} />
      <ContactList contacts={getFilteredData()} handleDelete={handleDelete} />
    </div>
  );
};
