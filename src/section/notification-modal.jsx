import { Button, ModalBase } from 'components';

import { ReactComponent as CheckIcon } from 'assets/icons/green-check-icon.svg';

const NotificationModal = (props) => {
  const { isOpen, toggleModal, title, message } = props;

  return (
    <ModalBase isOpen={isOpen} onClose={() => toggleModal(false)} width="30rem">
      <div className="success-modal">
        <section>
          <CheckIcon />
          <div>
            <h1>{title}</h1>
            <p>{message}</p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              toggleModal();
            }}
            full
          >
            Kembali
          </Button>
        </section>
      </div>
    </ModalBase>
  );
};

export default NotificationModal;
