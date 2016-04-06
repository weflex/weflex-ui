import Modal from './modal';
import confirm from './confirm';

Modal.info = function (props) {
  const config = {
    ...props,
    iconClassName: 'info-circled',
    okCancel: false,
  };
  return confirm(config);
};

Modal.success = function (props) {
  const config = {
    ...props,
    iconClassName: 'fa-check-circle',
    okCancel: false,
  };
  return confirm(config);
};

Modal.error = function (props) {
  const config = {
    ...props,
    iconClassName: 'cancel-circled',
    okCancel: false,
  };
  return confirm(config);
};

Modal.confirm = function (props) {
  const config = {
    ...props,
    okCancel: true,
  };
  return confirm(config);
};

export default Modal;
