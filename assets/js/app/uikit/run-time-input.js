import { h, Component } from 'preact';
import {useCallback} from 'preact/hooks';
import classNames from 'classnames';

import InputWrapper from './input-wrapper';

import RunDurationUtils from '../utils/run-duration';
import style from './text-input.css';

const TIME_PATTERN = "\d{1,3}:\d{2}:\d{2}";

// Like TextInput, but specifically for inputting durations for times of runs.
// This input operates in terms of seconds. `value` should be an integer of
// seconds for the time, and the arguments to `onChange` and `onInput` will be
// parsed versions of the input value transformed into seconds.
const RunTimeInput = (props) => {
  const {
    name,
    value: rawValue,
    label,
    note,
    placeholder="00:00:00",
    editable=true,
    onChange,
    onInput,
    className,
    ...inputProps
  } = props;

  const value = RunDurationUtils.secondsToString(rawValue);

  const handleChange = useCallback(({target}) => {
    const raw = target.value.trim();
    const value = RunDurationUtils.timeStringToSeconds(raw);
    onChange && onChange(value);
  }, [onChange]);

  const handleInput = useCallback(({target}) => {
    const raw = target.value.trim();
    const value = RunDurationUtils.timeStringToSeconds(raw);
    onInput && onInput(value);
  }, [onInput]);

  return (
    <InputWrapper
        name={name}
        label={label}
        note={note}
        className={className}
      >
      <input
        {...inputProps}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        pattern={TIME_PATTERN}
        class={style.input}
        onChange={handleChange}
        onInput={handleInput}
        disabled={!editable}
      />
    </InputWrapper>
  );
};

export default RunTimeInput;