import React from 'react'
import {UilTimes} from '@iconscout/react-unicons';

function Popup({todoTextHandler, value, onClickHandler, popupHandler, buttonText}) {
  return (
    <>
      <div className="add-todo-overlay">
            <div className="add-todo">
              <div className="close-btn" onClick={()=>popupHandler(false)}><UilTimes /></div>
              <h3>{buttonText} TODO</h3>
              <input 
                type="text"
                value={value}
                onChange={(e)=>todoTextHandler(e.target.name ,e.target.value)}
                name={buttonText}
              />
              <button onClick={()=>onClickHandler()}>{buttonText} Todo</button>
            </div>
          </div>
    </>
  )
}

export default Popup