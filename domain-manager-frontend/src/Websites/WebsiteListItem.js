import React from 'react';

const WebsiteListItem = ({name, url, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      <strong>{name}</strong>: {url}
    </span>
  </li>
)

export default WebsiteListItem;