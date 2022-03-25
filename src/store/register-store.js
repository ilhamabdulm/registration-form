import { createContext, useContext, useReducer } from 'react';

export const RegisterStoreContext = createContext({});

export const RegisterStoreActionTypes = {
  SET_REGISTER_STORE: 'SET_REGISTER_STORE',
};

const INITIAL_STATE = {
  registeredList: [],
  selectedUser: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case RegisterStoreActionTypes.SET_MASTER_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export const useRegisterStoreActions = (initialState = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdateRegisterStore = (key, value) => {
    dispatch({
      type: RegisterStoreActionTypes.SET_MASTER_DATA,
      payload: { [key]: value },
    });
  };

  return {
    state,
    handleUpdateRegisterStore,
  };
};

export const RegisterStoreProvider = ({ children }) => {
  const { state, handleUpdateRegisterStore } =
    useRegisterStoreActions(INITIAL_STATE);

  return (
    <RegisterStoreContext.Provider value={{ state, handleUpdateRegisterStore }}>
      {children}
    </RegisterStoreContext.Provider>
  );
};

export const useRegisterStore = () => useContext(RegisterStoreContext);
