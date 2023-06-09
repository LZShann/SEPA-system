import React, {useState} from 'react';
import '../App.css';
import logo from '../hcgm.png';
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {

  const [formData, setFormData] = useState({name:'', phone:'', email:'', password:''})
  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone
          }
        }
      })

      alert('Please back to the Login Page to Sign In')
    } catch (error) {
       alert(error)
    }

    const { data, error } = await supabase
      .from('user_table')
      .insert([
        { name: formData.name, 
          phone: formData.phone, 
          email: formData.email, 
          password: formData.password },
      ])
  };


  return (
    <div className='App'>
        <header className='App-header'>
            <div className="container-bg">
              <div className='container'>
                <img className='logo' src={logo} />
                <div className='container-box'>
                  <form onSubmit={handleSubmit}>
                    <p className='p-blue'>Your Name</p>
                    <input type="blue" name='name' placeholder="Name" required onChange={handleChange}/>

                    <p className='p-blue'>Your Phone Number</p>
                    <input type="blue" name='phone' placeholder="Phone Number" required onChange={handleChange}/>

                    <p className='p-blue'>Your Email</p>
                    <input type="blue" name='email' placeholder="Email" required onChange={handleChange}/>

                    <p className='p-blue'>Your Email</p>
                    <select>
                      
                    </select>

                    <p className='p-red'>Your Password</p>
                    <input type="password" name='password' placeholder="Password" required onChange={handleChange}/>

                    <input type="submit" value="Create Account" />

                  </form>

                  <p>Already have an account? Sign In <Link to='/'><u><b>Here</b></u></Link></p>
                </div>
              </div>
            </div>     
        </header>
    </div>
  );
}

export default SignUp;