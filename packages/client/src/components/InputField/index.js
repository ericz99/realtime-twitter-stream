import React, { forwardRef } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const InputField = forwardRef(({ className, name, type, onChange, placeholder, ...props }, ref) => {
  return (
    <InputGroup className={className}>
      <FormControl
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </InputGroup>
  );
});

export default InputField;
