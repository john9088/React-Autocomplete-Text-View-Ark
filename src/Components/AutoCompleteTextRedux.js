import React,{useEffect} from 'react'
import '../CustomStyle/AutoCompleteText.css'
import {connect} from 'react-redux'
// import AutoCompleteHelper from '../AutoCompleteHelper/AutoCompleteHelper'

const AutoCompleteText = ({ data,text,suggessions,cursor,
                            updateSearchQuery,updateTextInput,updateSuggessions,updateCursor}) =>{
    const items = data
    
    useEffect(() => {
        window.addEventListener('click',handleShowSuggessions)
        return(
            () => window.removeEventListener('click',handleShowSuggessions)
        )
    },)

    const onTextChange = (e) => {
        let value = e.target.value
        updateTextInput(value)
        let tempSuggessions = []
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            tempSuggessions = items.sort().filter(v => regex.test(v))
        }     
        updateSuggessions(tempSuggessions)
    }

    const renderSuggesstions = () => {
        if(suggessions.length === 0)
            return null
        else
            return(
                <ul>
                    {suggessions.map((item,index) => (
                        <li 
                            onClick={() => suggessionSelected(item)} 
                            key={index}
                            listid={index}
                            autocompletename={'inList'}
                            onMouseEnter={toggleHover}
                            className={(cursor === index) ?'highLight':null}
                            >{item}
                        </li>
                    ))} 
                </ul>
            )
    }
    
    const suggessionSelected = (value) =>{
        updateTextInput(value)
        updateSearchQuery(value)
        updateSuggessions([])
    }
    //To handle key inpute
    const handleKeyDown = (e) => {
        if(e.keyCode === 38 && cursor > 0){ //Up arrow
            updateCursor(cursor - 1)
        }
        else if(e.keyCode === 40 && cursor < suggessions.length - 1){ //Down arrow
            updateCursor(cursor + 1)
        }  
        else if(e.keyCode === 13){ //Enter button
            suggessionSelected(suggessions[cursor])
        }
        else if(e.keyCode === 27){ //Esc button
            updateSuggessions([])
        }
        else{
            updateCursor(0)
        }
    }

      //To handle onFocus and onBlur
    const handleShowSuggessions = (e) => {
        let value = e.target.getAttribute('autocompletename')
        if(value === null)
            updateSuggessions([])
        else if(value === 'inInput'){
            onTextChange(e)
            renderSuggesstions()
        } 
    }

    //On hover over li highlight the li
    const toggleHover = (e) => {
        updateCursor(e.target.getAttribute('listid'))
    }
    
    return(
        <div className='AutoCompleteText'>
            <input
                type='text' 
                value={text}
                autocompletename={'inInput'} 
                onChange={onTextChange}
                onKeyDown={handleKeyDown}
                placeholder='Search...'
                />
            {renderSuggesstions()} 
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateSearchQuery: (value) => {dispatch({type:'autoCompleteText/UPDATE_SEARCH_QUERY',payload: value})},
        updateTextInput: (value) => {dispatch({type:'autoCompleteText/ON_TEXT_CHANGE',payload: value})},
        updateSuggessions: (value) => {dispatch({type:'autoCompleteText/UPDATE_SUGGESSIONS',payload: value})},
        updateCursor: (value) => {dispatch({type:'autoCompleteText/UPDATE_CURSOR',payload: value})}
    }
}

const mapStateToProps = (state) => {
    return{
        data:state.allSuggessions,
        text:state.inText,
        suggessions:state.suggessions,
        cursor:state.cursor
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AutoCompleteText)
