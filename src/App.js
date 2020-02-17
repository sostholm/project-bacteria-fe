import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from "apollo-boost";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://pine64:4000/graphql',
});



client
  .query({
    query: gql`
      {
        allMicrobes{
          edges{
            node{
              fullName
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
