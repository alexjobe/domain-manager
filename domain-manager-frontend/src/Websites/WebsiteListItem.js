import React from 'react';

const WebsiteListItem = ({name, url, onSelect}) => (
  <li onClick={onSelect}>
    <span>
      <strong>{name}</strong>: {url}
    </span>
  </li>
)

export default WebsiteListItem;