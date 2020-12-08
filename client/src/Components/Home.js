import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import UsersContainer from './UsersContainer';

export default function Home() {

  const history = useHistory()
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      history.push('/login');
      return;
    }

    if (userId) {
      fetch(`/api/v1/users/${userId}`)
      .then(resp => {
        if (!resp.ok) {
          history.push('/login')
          return resp.json();
        }
        return resp.json();
      })
      .then(user => {
        if (!user) return;
        setUser(user)
      });
    }
  }, [])

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    history.push('/login')
  }

  if (!user) {
    return <div></div>
  }
  console.log(user)

  return (
    <div className="page">
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Coding language: {user.interest.name}</p>
      <button onClick={onLogoutClick}>Logout</button>
      <UsersContainer userId={user._id} />
    </div>
  );
}
