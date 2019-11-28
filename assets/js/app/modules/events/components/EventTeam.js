import {h} from 'preact';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as EventStore from '../EventStore';

import Header from '../../../uikit/header';
import Link from '../../../uikit/link';
import Text from '../../../uikit/text';

import {Routes} from '../../../constants';

const EventTeam = (props) => {
  const {
    team
  } = props;

  const {
    id: teamId,
    name,
    color,
    runs
  } = team;

  return (
    <div style={{'--themeColor': `#${color}`}}>
      <Link href={Routes.TEAM(teamId)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.THEMED} withMargin>
          {name}
        </Header>
      </Link>

      { _.map(runs, (run) => (
          <div>
            <Text color={Text.Colors.MUTED} marginless>{run.game.name}</Text>
            <Link href={Routes.ACCOUNT(run.account_id)}>
              <Text>{run.account.username}</Text>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default EventTeam;