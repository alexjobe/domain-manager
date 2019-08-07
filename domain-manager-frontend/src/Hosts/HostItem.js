import React from 'react';

const HostItem = ({name, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      {name}
    </span>
  </li>
)

export default HostItem;