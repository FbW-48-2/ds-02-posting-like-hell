import React from 'react';

const UserProfile = ({name}) => {
    return (
        <div>
            <h2>This is a landging page for our users.</h2>
            <p>Welcome back, {name}!</p>
        </div>
    )
}

export default UserProfile;