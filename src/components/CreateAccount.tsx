import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../types/mutations';
import { GET_ACCOUNTS } from '../types/queries';

const CreateAccount: React.FC = () => {
    const [accAttr, setAccAttr] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [createAccount, { error }] = useMutation(CREATE_ACCOUNT, {
        refetchQueries: [{ query: GET_ACCOUNTS }],
    });

  const [successMessage, setSuccessMessage] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccAttr((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createAccount({ variables: { input: accAttr } });
            if (result.data?.createAccount?.success) {
                setSuccessMessage(result.data.createAccount.message);
                setAccAttr({ username: '', email: '', password: '' });
            } else {
                setSuccessMessage('');
            }
        } catch (err) {
            console.error('Error creating account:', err);
        }
    };

    return (
        <div className='create-account'>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={accAttr.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={accAttr.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={accAttr.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default CreateAccount;
