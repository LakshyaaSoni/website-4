import { h } from 'preact';

import Link from './Link';
import Text from './Text';

import style from './BoxLink.css';

const BoxLink = props => {
  const { title, children, href, className, ...linkProps } = props;

  return (
    <p className={className}>
      <a className={style.boxLink} href={href} {...linkProps}>
        <Text className={style.header} color={Text.Colors.PRIMARY} marginless>
          {title}
        </Text>
        <Text className={style.body} marginless>
          {children}
        </Text>
      </a>
    </p>
  );
};

export default BoxLink;
