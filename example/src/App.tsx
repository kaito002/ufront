import React from 'react'

import { UFront } from 'ufront'

const App = () => {
  return (
    <div>
      <h2 style={{textAlign: "center"}}>Welcome to Micro Frontend World, here a independent section!!</h2>
      <div style={{display: "flex", justifyContent:"center"}}>
        <UFront host="http://localhost:8080" name="MicroSection" />
      </div>
    </div>
  )
}

export default App;