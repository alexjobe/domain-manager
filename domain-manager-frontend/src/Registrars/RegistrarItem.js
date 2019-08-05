import React from 'react';

const RegistrarItem = ({name, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      {name}
    </span>
  </li>
)

export default RegistrarItem;