import { h } from 'preact';

import InputWrapper from './InputWrapper';

import style from './PasswordInput.css';

// Password inputs are intentionally uncontrolled to avoid potentially leaking
// the value
const PasswordInput = props => {
  const { label, name, placeholder = '', note, onChange, className, ...inputProps } = props;

  return (
    <InputWrapper name={name} label={label} note={note} className={className}>
      <input
        type="password"
        name={name}
        class={style.input}
        placeholder={placeholder}
        onChange={onChange}
        {...inputProps}
      />
    </InputWrapper>
  );
};

export default PasswordInput;