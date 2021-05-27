import {combineReducers} from 'redux'
import reduce from './ReducerAutoComplete'
import ActiveSearchValue from './ReducerActiveSearchValue'

const allReducer = combineReducers({
    data:reduce,
    searchValue:ActiveSearchValue
})

export default allReducer