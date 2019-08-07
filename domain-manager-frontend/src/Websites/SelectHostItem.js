import React from 'react';

const SelectHostItem = ({host}) => (
  <option
    value={host._id}
  >
    {host.name}
  </option>
)

export default SelectHostItem;