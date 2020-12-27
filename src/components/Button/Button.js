import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClickHandler }) => {
  return (
    <button type="button" className={s.Button} onClick={onClickHandler}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default Button;
