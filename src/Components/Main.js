import React from 'react';
import AutoCompleteText from './AutoCompleteText'
import {connect} from 'react-redux'
import AutoCompleteTextRedux from './AutoCompleteTextRedux';

const Main = ({data}) =>{
    return (
        <div style={{textAlign:'center'}}>
            <span >Autocomplete Text View</span>
            {/* <AutoCompleteText 
                data = {data}
            /> */}
            <AutoCompleteTextRedux 
            data = {data}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        data:state.allSuggessions
    }
}
export default connect(mapStateToProps)(Main);