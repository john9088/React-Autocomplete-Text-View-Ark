import React,{useState, useEffect} from 'react'
import '../CustomStyle/AutoCompleteText.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import selectvalue from '../actions/index'


const AutoCompleteText = ({data}) =>{
    const items = data
    let [suggessions,setSuggessions] = useState([])
    let [text,setText] = useState('')
    let [cursor,setCursor] = useState(null)
    
    useEffect(() => {
        window.addEventListener('click',handleShowSuggessions)
        return(
            () => window.removeEventListener('click',handleShowSuggessions)
        )
    },[])

    const onTextChange = (e) => {
        const value = e.target.value
        setText(value)
        let tempSuggessions = []
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            tempSuggessions = items.sort().filter(v => regex.test(v))
        }    
          
        setSuggessions(tempSuggessions)
    }

    const rengerSuggesstions = () => {
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
    //Imp value
    const suggessionSelected = (value) =>{
        console.log(value)
        selectvalue(value)
        setText(value)
        setSuggessions([])
    }
    //To handle key inpute
    const handleKeyDown = (e) => {
        if(e.keyCode === 38 && cursor > 0){ //Up arrow
            setCursor(cursor - 1)
        }
        else if(e.keyCode === 40 && cursor < suggessions.length - 1){ //Down arrow
            setCursor(cursor + 1)
        }  
        else if(e.keyCode === 13){ //Enter button
            suggessionSelected(suggessions[cursor])
        }
        else{
            setCursor(0)
        }
            
    }

      //To handle onFocus and onBlur
    const handleShowSuggessions = (e) => {
        let value = e.target.getAttribute('autoCompleteName')
        if(value === null)
            setSuggessions([])
    }

    //On hover over li highlight the li
    const toggleHover = (e) => {
        setCursor(e.target.getAttribute('listid'))
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
            {rengerSuggesstions()} 
        </div>
    )
}
function mapStateToProps(state) {
    return { data: state.data };
} 

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({selectvalue:selectvalue}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(AutoCompleteText)