import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { Button, Input } from 'components';
import { useForm, useModal } from 'hooks';
import { useRegisterStore } from 'store';
import NotificationModal from './notification-modal';

const registerFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for first name '),
  last_name: yup
    .string()
    .required('Last name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for last name '),
  email: yup
    .string()
    .required('Valid email format is required')
    .email('Valid email format is required'),
  password: yup
    .string()
    .required('Required')
    .min(8, 'Password Minimal have 8 Character')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

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
  const [errors, setErrors] = useState({
    first_name: { state: false, message: '' },
    last_name: { state: false, message: '' },
    email: { state: false, message: '' },
    password: { state: false, message: '' },
    state: false,
  });

  useEffect(() => {
    if (selectedUser) {
      handleBulkChange(selectedUser);
    } else {
      resetForm();
      setErrors({
        first_name: { state: false, message: '' },
        last_name: { state: false, message: '' },
        email: { state: false, message: '' },
        password: { state: false, message: '' },
        state: false,
      });
    }
  }, [selectedUser]);

  const _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, [name]: { state: false, message: '' } }));

    handleStateSchange(name, value);
  };

  const _handleSubmit = (payload) => {
    registerFormSchema
      .validate(payload, { abortEarly: false })
      .then((res) => {
        const data = [...registeredList, { ...payload, id: uuidv4() }];
        handleUpdateRegisterStore('registeredList', data);
        console.log(res, 'this is res');
        setNotification({
          title: 'Berhasil',
          message: 'Data berhasil ditambahkan',
        });
        toggleModal();
        resetForm();
        setErrors((prev) => ({
          ...prev,
          state: false,
        }));
      })
      .catch((err) => {
        const errors = err?.inner?.map((err2) => ({
          field: err2?.path,
          error: err2?.errors[0],
        }));
        errors?.forEach((el) => {
          setErrors((prev) => ({
            ...prev,
            [el.field]: { state: true, message: el.error },
            state: true,
          }));
        });
        toggleModal();
        setNotification({
          title: 'Terjadi Kesalahan',
          message: errors,
        });
        console.log(errors);
      });
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
          error={errors?.first_name}
        />
        <Input
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Input last name"
          color="white"
          value={state?.last_name}
          onChange={_handleChange}
          error={errors?.last_name}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Input email"
          color="white"
          value={state?.email}
          onChange={_handleChange}
          error={errors?.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Input password"
          color="white"
          value={state?.password}
          onChange={_handleChange}
          error={errors?.password}
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
          disabled={Object?.keys(state)?.some((el) => !state[el])}
        >
          Submit
        </Button>
        <Button
          variant="tertiary"
          onClick={() => {
            resetForm();
            setErrors({
              first_name: { state: false, message: '' },
              last_name: { state: false, message: '' },
              email: { state: false, message: '' },
              password: { state: false, message: '' },
              state: false,
            });
          }}
        >
          Reset
        </Button>
      </footer>

      <NotificationModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        title={notification.title}
        message={notification.message}
        type={errors?.state ? 'error' : 'success'}
      />
    </section>
  );
};

export default RegisterForm;
