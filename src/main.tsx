import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
// import './index.css'
import App from './App.tsx'

// const accountsLink = new HttpLink({ uri: 'http://localhost:4000/graphql/accounts' });
// const commentsLink = new HttpLink({ uri: 'http://localhost:4000/graphql/comments' });

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/accounts',
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
  <Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </Fragment>,
)
