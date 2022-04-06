import React from 'react'

function Conversation({children}) {
  return (
    <p className='imessage' style={{minHeight : "100vh"}}>
        {children}
    </p>
  )
}

export default Conversation