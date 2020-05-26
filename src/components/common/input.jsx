import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      {/* ...rest parameter include all propertites except name */}
      <input {...rest} name={name} id={name} className='form-control' />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
