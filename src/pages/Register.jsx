import React, {useState} from 'react'

const Register = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-from-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" />
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>   
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Log In</button>
      
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")} >Already have an account? Login here </button>
    </div>
  )
}
export default Register;