import React, {useState} from 'react';
import '../App.css';
import logo from '../hcgm.png';
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({email:'', password:''});
    console.log(formData);

    // supabase.auth.onAuthStateChange(async (event) => {
    //     if (event === 'SIGNED_IN'){
    //         navigate('/Success');
    //     }
    //     else {
    //         navigate('/')
    //     }
    // })

    async function handleChange(event){
      setFormData((prevFormData)=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    };

    async function handleSubmit(e){
      e.preventDefault()
      try {
          const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
          })
          
          if (error) throw error
          console.log(data)
          navigate('/Statistic')
  
      } catch (error) {
         alert(error)
      }
    };

  return (
    <div className='App'>
        <header className='App-header'>
            <div className="container-bg">
              <div className='container'>
                <img className='logo' src={logo} />
                <div className='container-box'>
                  <form onSubmit={handleSubmit}>
                    <p className='p-blue'>Your Email</p>
                    <input type="blue" name='email' placeholder="Email" required onChange={handleChange}/>
                    <p className='p-red'>Your Password</p>
                    <input type="password" name='password' placeholder="Password" required onChange={handleChange}/>
                    <input type="submit" value="Sign In"/>
                  </form>
                  <p>Don't have an account? Sign Up <Link to='/Signup'><u><b>Here</b></u></Link></p>
                </div>
              </div>
            </div>     
        </header>
    </div>
  );
}

export default Login;