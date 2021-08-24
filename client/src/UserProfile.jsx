import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = ({ loginData }) => {
    const params = useParams();
    console.log(params.id);

    return (
        <div>
            <p>Welcome to your profile <strong>{loginData.username}</strong>!</p>
            <p>Your User ID is: <strong>{loginData._id}</strong></p>
        </div>
    )
}

export default UserProfile
