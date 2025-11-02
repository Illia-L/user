import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout/Layout';
import Account from './features/user/components/Account/Account';

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={<h1>Home Page</h1>}
        />

        <Route
          path='/page-1'
          element={<h1>Page 1</h1>}
        />

        <Route
          path='/account/*'
          element={<Account />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
