import React from 'react';

const Search = ({handleSearch}) => {

    const handleChange = (e) => {
        const term = e.target.value;

        handleSearch(term);
    }

    return (
        <div className="input-group" style={{width:"60%"}}>
            <input id="searchTerm" type="text" className="form-control" placeholder="Name, Role, Email..." name="searchTerm" onChange={handleChange}/>
            <div className="input-group-prepend">
                <span className="input-group-text">Search</span>
            </div>
        </div>
    )
}

export default Search;