import React from 'react';

const WebsiteItem = ({name, url, onSelect}) => (
  <li>
    <span onClick={onSelect}>
      {name} ----> {url}
    </span>
  </li>
)

export default WebsiteItem;