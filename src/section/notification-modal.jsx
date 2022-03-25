import { Button, ModalBase } from 'components';

import { ReactComponent as CheckIcon } from 'assets/icons/green-check-icon.svg';

const NotificationModal = (props) => {
  const { isOpen, toggleModal, title, message, type = 'success' } = props;

  return (
    <ModalBase isOpen={isOpen} onClose={() => toggleModal(false)} width="30rem">
      <div className="success-modal">
        <section>
          {type === 'success' ? <CheckIcon /> : null}
          <div>
            <h1>{title}</h1>
            <div className="success-modal__message">
              {Array.isArray(message) ? (
                message?.map((msg, i) => (
                  <p>
                    {msg?.field}: {msg?.error || '-'}
                  </p>
                ))
              ) : (
                <p>{message}</p>
              )}
            </div>
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
