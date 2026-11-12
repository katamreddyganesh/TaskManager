import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./SignUp.css"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function SignUp({setUser}) {
  // 1. Manage form input state
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault()
      fetch(`${API_BASE_URL}/Register`, 
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData)
      }
      )
      .then(async (response) =>
        {
          if (!response.ok) {
            console.log(response,"response from backend")
            const error = await response.json();
            setFormError(error.detail)
            throw new Error(`${error.detail}`);
          }
          return response.json();
      }
      )
      .then(response=>{
          navigate(`/signin`)
          console.log(response,"this is response")
      }
      )
      .catch(error=>{
        // setFormError(error);
        console.log(error.message)
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (

    <div className="SignUp-Container">
      
      {formError && (<div className="singup-Error">{formError}</div>)}
      <div className="sub-container">
      <div><h1>Sign<span style={{"color":"red"}}>U</span>p Page</h1></div>
      <div><form onSubmit={handleSubmit}>
        <div>
          <input 
            className="first_name"
            type="text" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            placeholder="first_name"
            required 
          />
        </div>
        <div>
          <input 
            className="last_name"
            type="text" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            placeholder="last_name"
            required 
          />
        </div>
        <div>
          <input 
            className="email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="email"
            required 
          />
        </div>
        <div>
            <input 
              className="password"
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="password"
              required 
            />
        </div>

        <button className="form-button" type="submit">Submit</button>
      </form>
      </div>
      </div>
  </div>
  );
}
