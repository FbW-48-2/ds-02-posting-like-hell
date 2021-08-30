import React from 'react';
import loginContext from '../context/loginContext';
import { useContext } from 'react';

const UserProfile = () => {
    const {user} = useContext(loginContext);

    return (
        <div>
            <p>This is dashboard</p>
            <p>Welcome, {user.username} !</p>
        </div>
    )
}

export default UserProfile;