import React, {useState} from 'react';
import '../App.css';
import logo from '../hcgm.png';
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState ({name:'', phone:'', email:'', password:'', role:'', department:'', supervisor:''})
  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  supabase.auth.getSession().then((data, error) => {
    // Check if session is found
    if (data['data']['session'] != null) {
      // User logged in
      window.location.replace('/Statistic');
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            role: formData.role,
            department: formData.department,
            supervisor: formData.supervisor
          }
        }
      });

      if (error){
        console.log('Error inserting data:', error.message);
      }

      alert('Sign Up Success! Please use the credentials to Sign In!');
      console.log('Data inserted successfully');
      navigate('/');
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='App'>
            <div className="container-bg">
              <div className='container'>
                <img className='logo' src={logo} />
                <div className='container-box'>
                  <form onSubmit={handleSubmit}>
                    <p className='p-blue'>Your Name</p>
                    <input type="blue" name='name' value={formData.name} placeholder="Name" required onChange={handleChange}/>

                    <p className='p-blue'>Your Phone Number</p>
                    <input type="blue" name='phone' value={formData.phone}  placeholder="Phone Number" required onChange={handleChange}/>

                    <p className='p-blue'>Your Email</p>
                    <input type="blue" name='email' value={formData.email} placeholder="Email" required onChange={handleChange}/>

                    <p className='p-blue'>Your Role</p>
                    <select type="selectStyle" name='role' value={formData.role}  placeholder="Please Select Your Role" required onChange={handleChange}>
                     <option value='' className="optStyle">Please Select Your Role</option>
                      <option value='Staff' className="optStyle">Staff</option>
                      <option value='Manager' className="optStyle">Manager</option>
                    </select>

                    <p className='p-blue'>Your Department</p>
                    <select type="selectStyle" name='department' value={formData.department} placeholder="Please Select Your Department" required onChange={handleChange}>
                      <option value='' className="optStyle">Please Select Your Department</option>
                      <option value='Staff' className="optStyle">Sales</option>
                      <option value='HR' className="optStyle">HR</option>
                      <option value='Admin' className="optStyle">Admin</option>
                      <option value='Account' className="optStyle">Account</option>
                      <option value='Production' className="optStyle">Production</option>
                    </select>

                    <p className='p-blue'>Your Supervisor</p>
                    <select type="selectStyle" name='supervisor' value={formData.supervisor} placeholder="Please Assign Your Supervisor" required onChange={handleChange}>
                      <option value='' className="optStyle">Please Assign Your Supervisor</option>
                      <option value='Dr Tang' className="optStyle">Dr Tang</option>
                      <option value='Ms Angie' className="optStyle">Ms Angie</option>
                    </select>

                    <p className='p-blue'>Your Password</p>
                    <input type="password" name='password' value={formData.password}  placeholder="Password (At least 6 characters)" required onChange={handleChange}/>

                    <input type="submit" value="Create Account"/>

                  </form>

                  <p>Already have an account? Sign In <Link to='/'><u><b>Here</b></u></Link></p>
                </div>
              </div>
            </div>
    </div>
  );
}

export default SignUp;