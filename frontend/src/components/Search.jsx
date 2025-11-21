import React from 'react'
import MapComponent from "../components/MapComponent"
import Searchbar from './Searchbar'

const Search = () => {
  return (
    <div className="flex">
        <Searchbar />
        <MapComponent />
    </div>
  )
}

export default Search