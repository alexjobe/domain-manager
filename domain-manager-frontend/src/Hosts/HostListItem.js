import React from 'react';

const HostListItem = ({name, onSelect}) => (
  <li onClick={onSelect}>
      <strong>{name}</strong>
  </li>
)

export default HostListItem;