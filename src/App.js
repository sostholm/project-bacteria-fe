import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'


const ALL_MICROBES = gql`
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

function AllMicrobes(){
  const {loading, error, data} = useQuery(ALL_MICROBES)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error:(</p>

  console.log('data', data)
  return data.allMicrobes.edges.map(node => (
    <div key={node.node.fullName}>
      <p>{node.node.fullName}</p>
    </div>
  ))
}

function App() {
  return (
    <div className="App">
      <AllMicrobes />
    </div>
  );
}

export default App;
