import React from 'react'
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import AccountsList from './components/AccountsList';
import Navigation from './Navigation';

const Layout = () => {

    const navigation = useNavigation();
    const location = useLocation(); // Access the current location/path

    const isLoading = navigation.state === 'loading';
    
    // Check if the current path is the home path
    const isNavHomePath = location.pathname === '/'

    return (
        <div className='main-comp'>
            {isLoading ? (
                <></>
            ) : (
                <Navigation />
            )}

            <main>
                <Outlet /> 
                {isNavHomePath && <AccountsList />} 
            </main>
        </div>
    )
}

export default Layout