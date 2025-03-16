// src/components/EditAccount.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_ACCOUNT } from '../types/queries';
import { UPDATE_ACCOUNT } from '../types/mutations';
import { Account } from '../types/types';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}


const EditAccount: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    // Fetch current account details
    const { loading, error, data } = useQuery<{ account: Account }>(GET_ACCOUNT, {
        variables: { id },
    });

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '', // Password might be optional; leave blank if you don't want to change it
    });

    const [updateAccount, { error: updateError }] = useMutation(UPDATE_ACCOUNT);

    useEffect(() => {
        if (data?.account) {
        setFormState({
            username: data.account.username,
            email: data.account.email,
            password: '',
        });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const result = await updateAccount({
            variables: {
            input: {
                id,
                username: formState.username,
                email: formState.email,
                password: formState.password, // Send password only if needed
            },
            },
        });
        if (result.data?.updateAccount?.success) {
            // Optionally navigate back to the account list or show a success message
            navigate('/accounts');
        }
        } catch (err) {
        console.error('Error updating account:', err);
        }
    };

    if (loading) return <p>Loading account details...</p>;
    if (error) return <p>Error fetching account: {error.message}</p>;

    return (
        <div>
        <h2>Edit Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formState.username} 
                    onChange={handleChange} 
                    required 
                />
                </div>
                <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formState.email} 
                    onChange={handleChange} 
                    required 
                />
                </div>
                <div>
                <label>Password (leave blank if unchanged):</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formState.password} 
                    onChange={handleChange} 
                />
                </div>
                <button type="submit">Update Account</button>
            </form>
            {updateError && <p style={{ color: 'red' }}>Error: {updateError.message}</p>}
        </div>
    );
};

export default EditAccount;
