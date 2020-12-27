import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onCloseModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };

//   handleBackdropClick = ({ target, currentTarget }) => {
//     if (target === currentTarget) {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleBackdropClick}>
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// Modal.propTypes = {
//   children: PropTypes.node,
//   onCloseModal: PropTypes.func.isRequired,
// };

// export default Modal;
