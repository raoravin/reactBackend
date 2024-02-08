import React, { useState } from 'react'

const SignIn = () => {

    const [state, setState] = useState({
        email:'',
        password:'',
      })
    
      const handleChange = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
    
        })
      }
    
      console.log(state.email,state.password);
    
    
      const handleSubmit = async(e) => {
        e.preventDefault()
      } 
  return (
    <div>
    <div className="signup-form">
      <div className="signup-form__wrapper">
       <form className="form">
        <div className="form-group">
          <input 
          type="email" 
          name="email" 
          id="" 
          placeholder="Enter Email"
          value={state.email}
          onChange={handleChange}
           />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="button">Sign up</button>
        </div>
       </form>
      </div>
    </div>
  </div>
  )
}

export default SignIn