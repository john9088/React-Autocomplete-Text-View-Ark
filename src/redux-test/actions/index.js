const selectvalue = (value) =>{
    console.log('The value is->', value)
    return{
        type:'UPDATE_SEARCH',
        payload: value
    }
}

export default selectvalue