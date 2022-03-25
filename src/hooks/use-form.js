import { useCallback, useState } from 'react';

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleStateSchange = useCallback(
    (key, value) => {
      setState((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setState]
  );

  const handleBulkChange = useCallback(
    (values) => {
      setState(values);
    },
    [setState]
  );

  const resetForm = useCallback(
    () => setState(initialState),
    [setState, initialState]
  );

  return {
    setState,
    state,
    handleStateSchange,
    handleBulkChange,
    resetForm,
  };
};

export default useForm;
