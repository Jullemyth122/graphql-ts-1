import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ACCOUNT, GET_ACCOUNTS, GET_COMMENTS } from '../types/queries';
import { CREATE_COMMENT, DELETE_ACCOUNT, DELETE_COMMENT, UPDATE_COMMENT } from '../types/mutations';
import { Account, Comment } from '../types/types';
import { Link } from 'react-router-dom';

const AccountsList: React.FC = () => {
    
    const { 
        loading: accountsLoading, 
        error: accountsError, 
        data: accountsData, 
        refetch: refetchAccounts 
    } = useQuery<{ accounts: Account[] }>(GET_ACCOUNTS);

    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
    
    const [deleteAccount] = useMutation(DELETE_ACCOUNT);
    const [deleteMessage, setDeleteMessage] = useState<string>('');
    
    const [fetchComments, { loading: commentsLoading, error: commentsError, data: commentsData, refetch: refetchComments }] =
        useLazyQuery<{ comments: Comment[] }>(GET_COMMENTS, {
            context: { clientName: 'comments' },
        });

    // Mutation for creating a comment
    const [createComment] = useMutation(CREATE_COMMENT, { context: { clientName: 'comments' } });
    // Mutation for updating a comment
    const [updateComment] = useMutation(UPDATE_COMMENT, { context: { clientName: 'comments' } });
    // Mutation for deleting a comment
    const [deleteComment] = useMutation(DELETE_COMMENT, { context: { clientName: 'comments' } });
    
    const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [editCommentContent, setEditCommentContent] = useState<{ [key: string]: string }>({});

    const handleSelectAccount = (accountId: string) => {
        if (selectedAccountId === accountId) {
            setSelectedAccountId(null);
        } else {
            setSelectedAccountId(accountId);
            fetchComments({ variables: { accountId } });
        }
    };

    const handleDeleteAccount = async (accountId: string) => {
        try {
            const response = await deleteAccount({ variables: { id: accountId } });
            const result = response.data.deleteAccount;
            setDeleteMessage(result.message);
            if (selectedAccountId === accountId) {
                setSelectedAccountId(null);
            }
            refetchAccounts();
        } catch (err) {
            console.error('Error deleting account:', err);
            setDeleteMessage('Error deleting account');
        }
    };

    const handleCreateComment = async (accountId: string) => {
        try {
            const response = await createComment({ 
                variables: { input: { accountId, content: newCommentContent } } 
            });
            if (response.data.createComment.success) {
                setNewCommentContent('');
                refetchComments();
            }
        } catch (err) {
            console.error('Error creating comment:', err);
        }
    };

    const handleUpdateComment = async (commentId: string) => {
        try {
            const newContent = editCommentContent[commentId];
            const response = await updateComment({
                variables: { input: { id: commentId, content: newContent } },
            });
            if (response.data.updateComment.success) {
                // Optionally update the local state or refetch comments to reflect changes.
                refetchComments();
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            const response = await deleteComment({ variables: { id: commentId } });
            if (response.data.deleteComment.success) {
                refetchComments();
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };


    if (accountsLoading) return <p>Loading accounts...</p>;
    if (accountsError) return <p>Error: {accountsError.message}</p>;

    return (
        <div className="accounts-list">
            <h2>Accounts</h2>
            {deleteMessage && <p className="success-message">{deleteMessage}</p>}
            <ul>
                {accountsData?.accounts.map((account) => (
                    <li key={account.id} className="account-item">
                        <div className="account-info">
                            <span onClick={() => handleSelectAccount(account.id)} className="account-name">
                                {account.username} ({account.email})
                            </span>
                            <div className="btn">
                                <Link to={`/accounts/${account.id}/edit`}>
                                    <button className="btn-edit">Edit</button>
                                </Link>
                                <button className="btn-delete" onClick={() => handleDeleteAccount(account.id)}>
                                    Delete
                                </button>
                                <button className="btn-comments" onClick={() => handleSelectAccount(account.id)}>
                                    {selectedAccountId === account.id ? 'Hide Comments' : 'Show Comments'}
                                </button>
                            </div>
                        </div>
                        {selectedAccountId === account.id && (
                            <div className="comments-section">
                                <h4>Comments for {account.username}</h4>
                                {commentsLoading && <p>Loading comments...</p>}
                                {commentsError && <p>Error: {commentsError.message}</p>}
                                
                                {commentsData && commentsData.comments.length === 0 && <p>No comments yet.</p>}
                                {commentsData && commentsData.comments.length > 0 && (
                                <ul className="comments-list">
                                    {commentsData.comments.map((comment) => {    
                                        const commentDate = new Date(Number(comment.createdAt));

                                        return(
                                            <li key={comment.id} className="comment-item">
                                                <input 
                                                    type="text"
                                                    name="content-comment"
                                                    value={editCommentContent[comment.id] !== undefined 
                                                            ? editCommentContent[comment.id]
                                                            : comment.content}
                                                    onChange={(e) => 
                                                    setEditCommentContent({
                                                        ...editCommentContent,
                                                        [comment.id]: e.target.value,
                                                    })
                                                    }
                                                    onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleUpdateComment(comment.id);
                                                    }
                                                    }}
                                                />
                                                <small>
                                                    Posted on: {commentDate.toLocaleString('en-US', { timeZone: 'UTC' })}
                                                </small>
                                                <button 
                                                    className="btn-delete-comment" 
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    Delete Comment
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                                )}
                                <div className="comment-form">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={newCommentContent}
                                        onChange={(e) => setNewCommentContent(e.target.value)}
                                    />
                                    <button onClick={() => handleCreateComment(account.id)}>
                                        Submit Comment
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountsList;
