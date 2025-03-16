// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountsList from './components/AccountsList';
import CreateAccount from './components/CreateAccount';
import './styles/main.scss';
import EditAccount from './components/EditAccount';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/accounts/new">Create Account</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/accounts/new" element={<CreateAccount />} />
        <Route path="/accounts" element={<AccountsList />} />
        <Route path='/accounts/:id/edit' element={<EditAccount/>}/>
        <Route path="/" element={<AccountsList />} />
      </Routes>
    </Router>
  );
};

export default App;
