import React from 'react'

const UserProfile = ({user}) => {
  return (
    <div className='profile'>
      <h1>Welcome back, {user.username}</h1>
      <div className="content">
        <img src="https://picsum.photos/200/300" alt="random image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Proin sed libero enim sed faucibus turpis in eu mi. Eu lobortis elementum nibh tellus molestie nunc. Aliquam nulla facilisi cras fermentum odio. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Massa tincidunt nunc pulvinar sapien et. Nibh venenatis cras sed felis eget velit. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Suscipit tellus mauris a diam maecenas sed enim ut sem. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Auctor urna nunc id cursus metus aliquam. Rhoncus dolor purus non enim praesent. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Feugiat in ante metus dictum at.

          Dignissim convallis aenean et tortor at risus viverra adipiscing. Dolor morbi non arcu risus quis varius quam quisque id. Eget aliquet nibh praesent tristique magna sit amet purus. Tempor id eu nisl nunc mi ipsum. Scelerisque eu ultrices vitae auctor eu augue. Viverra adipiscing at in tellus integer feugiat scelerisque. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Vestibulum lectus mauris ultrices eros in cursus turpis. A diam maecenas sed enim ut. Fermentum et sollicitudin ac orci. Sed felis eget velit aliquet. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Dictum sit amet justo donec enim diam vulputate ut pharetra.
        </p>
      </div>
    </div>
  )
}

export default UserProfile
