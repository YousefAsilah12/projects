







import "./Login.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { data } from "../../data/data";
export function Login(props) {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  function submitHandle(e) {
    e.preventDefault();
    console.log("hello");
    const userExists = checkUser(formData);
    console.log("userExist", userExists);
    if (userExists) {
      localStorage.setItem("user", JSON.stringify(userExists));
      navigate("/landing");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }



  const checkUser = (user) => {
    console.log("user", user);
    return data.find((u) => {
      if (u.email === user.email && u.password === user.password) {
        return true
      }
      return false
    })
  }




  return <form className="formDisplay" onSubmit={submitHandle}>
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" onChange={handleChange} />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="Password" onChange={handleChange} />
    </div>
    <div>
      <input type="submit" name="submite" id="submite" />
    </div>
  </form>
}