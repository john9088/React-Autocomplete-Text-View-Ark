import React from 'react';
import AutoCompleteText from './AutoCompleteText'
import AutoCompleteTextRedux from './AutoCompleteTextRedux';

const Main = () =>{
    return (
        <div style={{textAlign:'center'}}>
            <span >Autocomplete Text View</span>
            {/* <AutoCompleteText 
                data = {data}
            /> */}
            <AutoCompleteTextRedux />
        </div>
    );
}

export default (Main);