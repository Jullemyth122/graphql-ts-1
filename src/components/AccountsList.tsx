import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ACCOUNT, GET_ACCOUNTS } from '../types/queries';
import { Account } from '../types/types';
import { DELETE_ACCOUNT } from '../types/mutations';
import { Link } from 'react-router-dom';


const AccountsList: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<{ accounts: Account[] }>(GET_ACCOUNTS);
    const [selectedAccount, setSelectedAccount] = useState< Account | null >(null)
    const [deleteAccount] = useMutation(DELETE_ACCOUNT);
    const [deleteMessage, setDeleteMessage] = useState<string>('');


    const [fetchAccount] = useLazyQuery<{ account: Account }>(GET_ACCOUNT, {
        onCompleted: (data) => {
            setSelectedAccount(data.account);
        },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSelectedAccount = (accountId: string) => {
        fetchAccount({ variables: { id: accountId } });
    };


    const handleDeleteAccount = async (accountId: string) => {
        try {
            const response = await deleteAccount({ variables: { id: accountId } });
            const result = response.data.deleteAccount;
            setDeleteMessage(result.message);
            // Optionally clear selected account if it was deleted.
            if (selectedAccount && selectedAccount.id === accountId) {
                setSelectedAccount(null);
            }
            // Refetch the account list after deletion.
            refetch();
        } catch (err) {
            console.error('Error deleting account:', err);
            setDeleteMessage('Error deleting account');
        }
    };

    

    return (
        <div className='accounts-list'>
            <h2>Accounts</h2>
            {deleteMessage && <p style={{ color: 'green' }}>{deleteMessage}</p>}
            <li> {selectedAccount && 
                    <>
                        Selected Account <br/>
                        {selectedAccount.username} || {selectedAccount.email}
                    </>
                } 
            </li>
            <ul style={{ display:'grid', gap:'5px' }}>
                {data?.accounts.map((account) => (
                <li key={account.id} 
                    style={{ background: 'linear-gradient(to right ,#ffffff ,#ffb861)', padding:'5px' }}
                >

                    <span onClick={() => handleSelectedAccount(account.id)}>
                    {account.username} ({account.email})
                    </span>
                    <Link to={`/accounts/${account.id}/edit`}>
                        <button style={{ marginRight: '5px' }}>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>

                </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountsList;
