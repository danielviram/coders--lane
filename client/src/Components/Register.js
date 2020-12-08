import React, { useState, useContext, useEffect } from "react";
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import ErrorNotice from "./ErrorNotice";

export default function Register() {
  const [interests, setInterests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [interest, setInterest] = useState('');

  const [errors, setErrors] = useState([]);

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/v1/interests')
    .then(resp => resp.json())
    .then(interests => {
      const interestsDropdownArray = interests.map(interest => {
        let interestDropdown = new Object();
        interestDropdown.value = interest._id;
        interestDropdown.label = interest.name;
        return interestDropdown;
      })

      setInterests(interestsDropdownArray)
    })
  }, [])

  const submit = async (e) => {
    e.preventDefault();

    const userRegister = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      interest: interest.value
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(userRegister)
    }

    fetch('/api/v1/users/register', reqObj)
    .then(resp => {
      if (resp.status === 400) {
        return resp.json().then(errors => setErrors(errors))
      }
      return resp.json();
    })
    .then(user => {
      if (!user) return;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.user._id);
      history.push('/home');
    })
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {errors.map(error => <p>{error}</p>)}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-firstName">First Name</label>
        <input id="register-firstName" type='name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label htmlFor="register-lastName">Last Name</label>
        <input id="register-lastName" type='name' value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="register-username">Username</label>
        <input id="register-username" type="name" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="register-password">Password</label>
        <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Select options={interests} value={interest} onChange={(e) => setInterest(e)} />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
