import { commonThunk, denulled } from '../../Actions';

export function fetchGames(gameIds) {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/games',
      name: 'games',
      query: denulled({
        // eslint-disable-next-line camelcase
        game_ids: gameIds,
      }),
    },
    (dispatch, response) => {
      dispatch(receiveGames(response.games));
    }
  );
}

export function fetchGame(gameId) {
  return fetchGames([gameId]);
}

export function receiveGames(games) {
  return {
    type: 'RECEIVE_GAMES',
    data: {
      games,
    },
  };
}
