import React from 'react';

const BackButton = ({onClick}) => (
    <div onClick={onClick}><i id="backButton" className="fa fa-arrow-left fa-2x"></i></div>
)

export default BackButton;