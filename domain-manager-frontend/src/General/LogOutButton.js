import React from 'react';

const LogOutButton = ({onClick}) => (
    <div onClick={onClick}><i id="logOutButton" className="fa fa-sign-out fa-2x"></i></div>
)

export default LogOutButton;