import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, onDelete }) => {
  return (
    <li key={id} className={css.item}>
      <p className={css.text}>
        {name}: {number}
      </p>
      <button className={css.btn} onClick={() => onDelete(id)} type="button">
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
