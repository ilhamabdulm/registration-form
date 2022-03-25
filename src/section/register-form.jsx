import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from 'components';
import { useForm, useModal } from 'hooks';
import { useRegisterStore } from 'store';
import NotificationModal from './notification-modal';

const RegisterForm = (props) => {
  const { state, handleStateSchange, resetForm, handleBulkChange } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { isOpen, toggleModal } = useModal();

  const {
    state: { registeredList, selectedUser },
    handleUpdateRegisterStore,
  } = useRegisterStore();

  const [notification, setNotification] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    if (selectedUser) {
      handleBulkChange(selectedUser);
    } else {
      resetForm();
    }
  }, [selectedUser]);

  const _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleStateSchange(name, value);
  };

  const _handleSubmit = (payload) => {
    const data = [...registeredList, { ...payload, id: uuidv4() }];
    handleUpdateRegisterStore('registeredList', data);
    setNotification({
      title: 'Berhasil',
      message: 'Data berhasil ditambahkan',
    });
    toggleModal();
    resetForm();
  };

  const _handleEdit = (payload, id) => {
    let data = [...registeredList];
    let toEditIdx = data?.findIndex((dt) => dt.id === id);
    let toEdit = data?.find((dt) => dt.id === id);
    toEdit = { ...toEdit, ...payload };
    data[toEditIdx] = toEdit;

    handleUpdateRegisterStore('registeredList', data);
    handleUpdateRegisterStore('selectedUser', null);
    setNotification({
      title: 'Berhasil',
      message: 'Data berhasil diperbaharui',
    });
    toggleModal();
    resetForm();
  };

  return (
    <section className="form-container">
      <form>
        <Input
          type="text"
          name="first_name"
          label="First Name"
          placeholder="Input first name"
          color="white"
          value={state?.first_name}
          onChange={_handleChange}
        />
        <Input
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Input last name"
          color="white"
          value={state?.last_name}
          onChange={_handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Input email"
          color="white"
          value={state?.email}
          onChange={_handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Input password"
          color="white"
          value={state?.password}
          onChange={_handleChange}
        />
      </form>
      <footer>
        <Button
          variant="primary"
          onClick={() =>
            selectedUser
              ? _handleEdit(state, selectedUser?.id)
              : _handleSubmit(state)
          }
        >
          Submit
        </Button>
        <Button variant="tertiary" onClick={resetForm}>
          Reset
        </Button>
      </footer>

      <NotificationModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        title={notification.title}
        message={notification.message}
      />
    </section>
  );
};

export default RegisterForm;
