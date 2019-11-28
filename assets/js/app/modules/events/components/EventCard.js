import {h} from 'preact';
import {connect} from 'react-redux';

import Header from '../../../uikit/header';
import Link from '../../../uikit/link';
import Text from '../../../uikit/text';
import * as EventStore from '../EventStore';

import {Routes} from '../../../constants';
import style from './EventCard.css';


const EventCard = (props) => {
  const {
    event
  } = props;

  const {
    name,
    series,
    summary
  } = event;

  return (
    <div class={style.container}>
      <Link href={Routes.EVENT(event.id)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.PRIMARY}>
          {series && `${series.name} - `}
          {name}
        </Header>
      </Link>
      <Text>{summary}</Text>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
  };
}

export default connect(
  mapStateToProps
)(EventCard);