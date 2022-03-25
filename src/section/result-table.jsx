import { useMemo } from 'react';

import { Button, DataTable } from 'components';
import { useRegisterStore } from 'store';

const ResultTable = (props) => {
  const {
    state: { registeredList },
    handleUpdateRegisterStore,
  } = useRegisterStore();

  const _handleDelete = (id) => {
    console.log(id, registeredList);
    const data = [...registeredList].filter((dt) => dt?.id !== id);
    handleUpdateRegisterStore('registeredList', data);
  };

  const columns = useMemo(() => {
    return [
      {
        key: 'no',
        dataIndex: 'no',
        title: 'No',
        render: (_, x, i) => {
          return i + 1;
        },
      },
      {
        key: 'first_name',
        dataIndex: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        dataIndex: 'last_name',
        title: 'Last Name',
      },
      {
        key: 'email',
        dataIndex: 'email',
        title: 'Email',
      },
      {
        key: 'password',
        dataIndex: 'password',
        title: 'Password',
      },
      {
        key: 'action',
        dataIndex: 'id',
        title: 'Action',
        align: 'center',
        render: (dt, record) => {
          return (
            <div className="table-button__action">
              <Button
                size="small"
                variant="secondary"
                onClick={() => {
                  handleUpdateRegisterStore('selectedUser', record);
                }}
              >
                Edit
              </Button>
              <Button size="small" onClick={() => _handleDelete(dt)} danger>
                Delete
              </Button>
            </div>
          );
        },
      },
    ];
  }, [_handleDelete]);

  return (
    <section className="table-container">
      <DataTable columns={columns} data={registeredList} headerSeparator />
    </section>
  );
};

export default ResultTable;
