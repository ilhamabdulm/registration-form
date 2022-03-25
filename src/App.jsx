import { DataTable, Input } from 'components';

function App() {
  return (
    <div className="root">
      <article className="container">
        <h1>Register Form</h1>
        <section className="form-container">
          <form>
            <Input
              type="text"
              name="first_name"
              label="First Name"
              placeholder="Input first name"
              color="white"
            />
            <Input
              type="text"
              name="last_name"
              label="Last Name"
              placeholder="Input last name"
              color="white"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Input email"
              color="white"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Input password"
              color="white"
            />
          </form>
        </section>
        <section className="table-container">
          <DataTable columns={[]} data={[]} headerSeparator />
        </section>
      </article>
    </div>
  );
}

export default App;
