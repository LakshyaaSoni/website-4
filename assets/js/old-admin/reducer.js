import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

const defaultState = {
  accounts: {},
  events: {},
  games: {},
  fetching: {},
};

const reducerActions = {
  FETCH_STARTED: (state, { data }) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: true,
      },
    };
  },

  FETCH_SUCCEEDED: (state, { data }) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: false,
      },
    };
  },

  FETCH_FAILED: (state, { data }) => {
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [data.fetchId]: 'failed',
      },
    };
  },

  RECEIVE_ACCOUNTS: (state, { data }) => {
    const { accounts } = data;
    const accountsById = _.reduce(
      accounts,
      (acc, account) => {
        acc[account.id] = account;
        return acc;
      },
      {}
    );

    return {
      ...state,
      accounts: {
        ...state.accounts,
        ...accountsById,
      },
    };
  },

  RECEIVE_EVENTS: (state, { data }) => {
    const { events } = data;
    const eventsById = _.reduce(
      events,
      (acc, event) => {
        acc[event.id] = event;
        return acc;
      },
      {}
    );

    return {
      ...state,
      events: {
        ...state.events,
        ...eventsById,
      },
    };
  },

  RECEIVE_GAMES: (state, { data }) => {
    const { games } = data;
    const gamesById = _.reduce(
      games,
      (acc, game) => {
        acc[game.id] = game;
        return acc;
      },
      {}
    );

    return {
      ...state,
      games: {
        ...state.games,
        ...gamesById,
      },
    };
  },
};

export function reducer(state = defaultState, action) {
  const func = reducerActions[action.type];
  const newState = func ? func(state, action) : state;
  return newState;
}

export const store = createStore(reducer, applyMiddleware(thunk));
