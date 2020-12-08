import React, {useEffect, useState} from 'react';

const UsersContainer = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/users/same-interest-users/${props.userId}`)
        .then(resp => resp.json())
        .then(users => {
            setUsers(users)
        })
    }, [])

    if (users.length === 0) {
        return <h1>No users found!</h1>
    }

    return (
        <div>
            {users.map(user => 
                (<div>
                    <h1>Name: {user.firstName} {user.lastName}</h1>
                    <h2>Email: {user.email}</h2>
                    <p>Coding language: {user.interest.name}</p>
                    </div>
                )
            )}
        </div>
    )
}

export default UsersContainer;