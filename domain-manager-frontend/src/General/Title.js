import React from 'react';
import BackButton from './BackButton';

const Title = ({titleString, onBack}) => (
  <div className = "Title">
    <BackButton onClick={onBack}></BackButton>
    <h2>{titleString}</h2>
  </div>
)

export default Title;