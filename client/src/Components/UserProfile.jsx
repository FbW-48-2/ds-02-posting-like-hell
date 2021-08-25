import React from 'react';

export default function UserProfile({user}) {
  return (
    <div>
      <h3>User Profile</h3>
      <img src="https://picsum.photos/200" alt="something"/>
      <p>{user.username}</p>
    </div>
  )
}
