import React, {useState} from 'react';
import '../App.css';
import logo from '../hcgm.png';
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, UserProfile } from '../components';
import Statistic from './Statistic';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({email:'', password:''});
    const [userData, setUserData] = useState({id:'', role:''});

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
           // Sign in user from to Statistic based on email and password
          const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
          })

           // Fetch the user role from the database
          const { data: roles, error: roleError } = await supabase
            .from('users_data')
            .select('role')
            .eq('email', formData.email)
            .single();
          const userRole = roles ? roles.role : null;
          setUserData(userRole);

          // Fetch the user id from the database
          const { data: id, error: idError } = await supabase
            .from('users_data')
            .select('id')
            .eq('email', formData.email)
            .single();
          const userID = id ? id.id : null;
          setUserData(userID);
          
          if (error) throw error
          if (roleError) throw roleError
          if (idError) throw idError
          
          console.log(data)
          console.log(roles)
          console.log(id)
          // sessionStorage.setItem('userRole', userRole)
          // sessionStorage.setItem('userID', userID)
          // console.log(sessionStorage)
          navigate('/Statistic')

      } catch (error) {
         alert(error)
      }
    };
    
  return (
    <div className='App'>
            <div className="container-bg"> 
              <div className='container'>
                <img className='logo' src={logo} />
                <div className='container-box'>
                  <form onSubmit={handleSubmit}>
                    <p className='p-blue'>Your Email</p>
                    <input type="blue" name='email' placeholder="Email" required onChange={handleChange}/>
                    <p className='p-blue'>Your Password</p>
                    <input type="password" name='password' placeholder="Password" required onChange={handleChange}/>
                    <input type="submit" value="Sign In"/>
                  </form>
                  <p>Don't have an account? Sign Up <Link to='/Signup'><u><b>Here</b></u></Link></p>
                </div>
              </div>
            </div>   
    </div>
  );
}

export default Login;