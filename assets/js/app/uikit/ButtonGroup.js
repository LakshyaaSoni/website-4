import { h } from 'preact';
import classNames from 'classnames';

import style from './ButtonGroup.css';

const ButtonGroup = props => {
  const { children, className } = props;

  return <div class={classNames(style.group, className)}>{children}</div>;
};

export default ButtonGroup;
