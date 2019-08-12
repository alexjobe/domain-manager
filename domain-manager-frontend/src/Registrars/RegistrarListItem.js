import React from 'react';

const RegistrarListItem = ({name, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      <strong>{name}</strong>
    </span>
  </li>
)

export default RegistrarListItem;