import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search(props) {
    // changing the location of the user's input 
    function textChange(event) {
        props.setLocation(event.target.value);
    }
    // calling the function in app.js when it happens
    function Enter(event) {
        props.Enter();
    }
    // showing the search bar and search button
    return (
        <div>
            <input type="text" class="search-bar" placeholder="Search for a location..."
                onChange={textChange} value={props.location}></input>
            <button><FontAwesomeIcon icon={faSearch} onClick={Enter} /></button>
        </div>
    );
}

export default Search;
