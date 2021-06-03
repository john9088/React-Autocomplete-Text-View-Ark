export const initialState = {
    allSuggessions: ['halajason','jason','johnjason','rohan', 'seanA','seannB'
    ,'seanC','SeannD','SeanE','seannF' ,'siddharth'],
    searchQuery:'',
    inText:'',
    suggessions:[],
    cursor:0
};

export const Reducer = (state=initialState, action) => {
    if(action.type === 'autoCompleteText/UPDATE_SEARCH_QUERY')
        return {...state, searchQuery: action.payload}
    if(action.type === 'autoCompleteText/ON_TEXT_CHANGE')
        return {...state, inText: action.payload}
    if(action.type === 'autoCompleteText/UPDATE_SUGGESSIONS')
        return {...state, suggessions: action.payload}
    if(action.type === 'autoCompleteText/UPDATE_CURSOR')
        return {...state, cursor: action.payload}
    return state
}