import React from 'react';

const RegistrarListItem = ({name, onSelect}) => (
  <li onClick={onSelect}>
      <strong>{name}</strong>
  </li>
)

export default RegistrarListItem;