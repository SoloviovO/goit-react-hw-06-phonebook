import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contacts';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  // alternative without hook useLocalStorage
  // useState(() => {
  //   return (
  //     JSON.parse(localStorage.getItem(LS_KEY)) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prev => [
      ...prev,
      {
        name,
        number,
        id: nanoid(),
      },
    ]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <h1 style={{ textAlign: ' center' }}>Pnonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 style={{ textAlign: ' center' }}>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList contacts={getVisibleContacts()} onDelete={deleteContacts} />
    </>
  );
};
