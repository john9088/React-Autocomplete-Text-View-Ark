export const initialState = {
    allSuggessions: ['halajason','jason','johnjason','rohan', 'seanA','seannB'
    ,'seanC','SeannD','SeanE','seannF' ,'siddharth'],
    searchQuery:''
};

export const Reducer = (state=initialState, action) => {
    
    if(action.type === 'UPDATE_SEARCH_QUERY')
        return {...state, searchQuery: action.payload}
    return state
}