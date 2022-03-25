import { useMemo } from 'react';

import { DataTable } from 'components';
import { useRegisterStore } from 'store';

const ResultTable = (props) => {
  const {
    state: { registeredList },
  } = useRegisterStore();

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
        dataIndex: 'action',
        title: 'Action',
      },
    ];
  }, []);

  return (
    <section className="table-container">
      <DataTable columns={columns} data={registeredList} headerSeparator />
    </section>
  );
};

export default ResultTable;
