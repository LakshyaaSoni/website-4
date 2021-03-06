import { h } from 'preact';
import classNames from 'classnames';

import { ASSETS_URL } from '../Constants';
import styles from './Avatar.mod.css';

const Avatar = props => {
  const { url = ASSETS_URL, src, fullSrc = null, size = 128, useDefault = true, className } = props;

  const resolvedSrc = src || (useDefault ? 'default-avatar' : src);
  const assetUrl = fullSrc != null ? fullSrc : `${url}/${resolvedSrc}`;

  return (
    <img
      class={classNames(styles.avatar, className)}
      style={{ '--size': `${size}px` }}
      width={size}
      height={size}
      src={assetUrl}
    />
  );
};

export default Avatar;
