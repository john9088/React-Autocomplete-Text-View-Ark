import { createStore} from 'redux' 
import {Reducer} from './reducer'

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}