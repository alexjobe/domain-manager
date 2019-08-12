import React from 'react';

const HostListItem = ({name, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      <strong>{name}</strong>
    </span>
  </li>
)

export default HostListItem;