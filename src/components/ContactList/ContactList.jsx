import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => (
  <ul className={css.list}>
    {contacts.map(({ id, name, number }) => (
      <ContactItem
        key={id}
        id={id}
        name={name}
        number={number}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
