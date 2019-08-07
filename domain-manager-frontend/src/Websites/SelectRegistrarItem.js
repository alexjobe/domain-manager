import React from 'react';

const SelectRegistrarItem = ({registrar}) => (
  <option
    value={registrar._id}
  >
    {registrar.name}
  </option>
)

export default SelectRegistrarItem;