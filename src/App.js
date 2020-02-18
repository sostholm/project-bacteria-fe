import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeIcons } from '@uifabric/icons';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
// import {ALL_MICROBES, MICROBES_FILTERED_BY_SPECIES} from './queries'
import { gql } from 'apollo-boost'

initializeIcons();

// ALL_MICROBES
const MICROBES_FILTERED_BY_SPECIES = gql`
query Microbe($species: String!){
    allMicrobes(species: $species){
      edges{
        node{
          fullName
        }
      }
    }
  }
`
function AllMicrobes(){
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)
  const [getMicrobes, {loading, error, data}] = useLazyQuery(MICROBES_FILTERED_BY_SPECIES)

  // { variables: { breed: 'bulldog' } }
  useEffect(()=>{
    if (data && data.allMicrobes) {
      console.log('data', data)
      setResults(data);
    }
  },[data])
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error:(</p>
  
    
  const Results = (props) => {
    return props.data? props.data.allMicrobes.edges.map(node => (
      <div key={node.node.fullName}>
        <p>{node.node.fullName}</p>
      </div> 
    )) : null
  }
  return (
    <div>
      <SearchBox
        styles={{ root: { width: 200 } }}
        placeholder="Search"
        onEscape={ev => {
          console.log('Custom onEscape Called');
        }}
        onClear={ev => {
          console.log('Custom onClear Called');
        }}
        onChange={(_, newValue) => setSearch(newValue)}
        onSearch={newValue => getMicrobes({ variables: { species: search }})}
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
      />
      <Results data={results}/>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <AllMicrobes />
    </div>
  );
}

export default App;
