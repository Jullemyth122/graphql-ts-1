import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
// import './index.css'
import App from './App.tsx'

// Define two HttpLinks:
const accountsLink = new HttpLink({ uri: 'http://localhost:4000/graphql/accounts' });
const commentsLink = new HttpLink({ uri: 'http://localhost:4000/graphql/comments' });

// Use a split link to decide based on the context:
const splitLink = ApolloLink.split(
  (operation) => {
    
    // Check a custom field in the operation context.
    return operation.getContext().clientName === 'comments';
  },
  commentsLink, // If true, route to comments endpoint
  accountsLink, // Otherwise, use accounts endpoint
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
  <Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </Fragment>,
)
