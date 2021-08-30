import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState([]);
    const params = useParams();
    console.log(params.id);
    console.log(user);

    // Get user from API
    useEffect(() => {
        const getData = async() => {
        const userData = await(await fetch(`http://localhost:5000/users/${params.id}`)).json();
        setUser(userData);
        };
        getData();
    }, [params.id]);

    return (
        <div>
            <p>Welcome to your profile <strong>{user.username}</strong>!</p>
            <p>Your User ID is: <strong>{user._id}</strong></p>
        </div>
    )
}

export default UserProfile
