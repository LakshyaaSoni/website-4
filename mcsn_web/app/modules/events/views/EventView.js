import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as TeamActions from '../../teams/TeamActions';
import Layout from '../../layout/components/Layout';
import * as EventActions from '../EventActions';
import * as EventStore from '../EventStore';
import EventHeader from '../components/EventHeader';
import EventTeam from '../components/EventTeam';

import { Columns, Column } from 'bloomer';

class EventView extends Component {
  componentDidMount() {
    this.fetchEvent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventId !== this.props.eventId) {
      this.fetchEvent();
    }
  }

  fetchEvent() {
    const { eventId, dispatch } = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams({ eventId }));
  }

  render() {
    const { event, teams = [] } = this.props;

    if (event == null) return <Layout>Loading</Layout>;

    return (
      <Layout>
        <EventHeader event={event} />

        <Columns isMultiline>
          {_.map(
            teams,
            team =>
              team && (
                <Column>
                  <EventTeam team={team} />
                </Column>
              )
          )}
        </Columns>
      </Layout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
    teams: EventStore.getEventTeams(state, props),
  };
}

export default connect(mapStateToProps)(EventView);
