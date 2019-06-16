import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';

import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';

class AccountPage extends Component {
  componentDidMount() {
    const {accountId, dispatch} = this.props;

    dispatch(AccountActions.fetchAccount(accountId));
    dispatch(StreamActions.fetchStream(accountId));
  }

  render() {
    const {account, stream, loading, loadingStream} = this.props;

    if(account == null) return "loading";

    return (
      <div class="container">
        <section class="section">
          <div class="columns">
            <div class="column is-4-tablet is-3-desktop">
              <AccountCard
                account={account}
                stream={stream}
                loadingStream={loadingStream}
              />
            </div>

            <div class="column is-8-tablet is-5-desktop">
              <RunList runs={account.runs} />
            </div>
          </div>
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  const {accountId} = props;
  return {
    account: state.accounts[accountId],
    stream: state.streams[accountId],
    loading: state.fetching[`accounts.${accountId}`],
    loadingStream: state.fetching[`streams.${accountId}`]
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountPage);