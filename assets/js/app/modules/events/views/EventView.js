import {h, Component} from 'preact';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as FetchStore from '../../../selectors/fetch';
import * as TeamActions from '../../teams/TeamActions';
import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';
import EventHeader from '../components/EventHeader';
import Team from '../components/EventTeam';

import {
  Columns,
  Column,
  Heading,
} from 'bloomer';
import Header from '../../../uikit/header';
import Text from '../../../uikit/text';
import Layout from '../../../pages/layout';

class EventView extends Component {
  componentDidMount() {
    const { eventId, dispatch } = this.props;
    this.fetchEvent();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.eventId != this.props.eventId) {
      this.fetchEvent();
    }
  }

  fetchEvent() {
    const { eventId, dispatch } = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams({eventId}));
  }

  render() {
    const {
      event,
      teams = [],
      loading
    } = this.props;

    if(loading || event == null) return <Layout>Loading</Layout>;

    return (
      <Layout>
        <EventHeader event={event} />

        <Columns isMultiline>
          { _.map(teams, (team) => (team &&
              <Column isSize={3}>
                <Team team={team}></Team>
              </Column>
            ))
          }
        </Columns>
      </Layout>
    );
  }
};

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
    teams: EventStore.getEventTeams(state, props),
    loading: FetchStore.isFetching(state, {fetchGroup: `events.${props.eventId}`})
  }
}

export default connect(
  mapStateToProps
)(EventView);