import  { useState } from 'react';
import './search.css'


const Search = ({getResponse}) => {
  const [value,setValue]=useState("");
  const [debounceTimer, setDebounceTimer]=useState(null);

   /**
     * Debouce the search to reduce the hits on per change 
     * @param {object} event 
     * @returns {null}
     */
    const debounceSearch=(event)=>{
      setValue(event.target.value);
      if(debounceTimer)
      {
        clearTimeout(debounceTimer)
      }
      let value=event.target.value;
      let  timer;
      timer=setTimeout(()=>{
        getResponse(value.toLowerCase())

      },2000)
      setDebounceTimer(timer);
    }


  return (
    <div className="container mt-2 mb-4">
      <input type='search'
      placeholder='Search by name'
      className='form-control search-box'
      value={value}
      onChange={(event)=>{debounceSearch(event)}}

      />
      
    </div>
  );
}

export default Search;
