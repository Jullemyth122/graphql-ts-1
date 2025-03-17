// App.tsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountsList from './components/AccountsList';
import CreateAccount from './components/CreateAccount';
import './styles/main.scss';
import EditAccount from './components/EditAccount';
import Layout from './Layout';
import Error from './Error';


const router = createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  errorElement:<Error/>,
  children:[
    {
      path:'/accounts/new',
      element:<CreateAccount/>
    },
    {
      path:'/accounts',
      element:<AccountsList/>
    },
    {
      path:'/accounts/:id/edit',
      element:<EditAccount/>
    },
  ]
}])

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
    // <Router>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/accounts">Accounts</Link>
    //       </li>
    //       <li>
    //         <Link to="/accounts/new">Create Account</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <Routes>
    //     <Route path="/accounts/new" element={<CreateAccount />} />
    //     <Route path="/accounts" element={<AccountsList />} />
    //     <Route path='/accounts/:id/edit' element={<EditAccount/>}/>
    //     <Route path="/" element={<AccountsList />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
