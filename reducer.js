export const GET_REPOS = 'my-awesome-app/repos/LOAD';
export const GET_REPOS_SUCCESS = 'my-awesome-app/repos/LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'my-awesome-app/repos/LOAD_FAIL';

export default function reducer(state = { repos: [] }, action) {
  switch (action.type) {
    case GET_REPOS:
      return { ...state, loading: true };
    case GET_REPOS_SUCCESS:
      return { ...state, loading: false, repos: action.payload.data };
    case GET_REPOS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
}

export function listRepos(qtd) {
  return {
    type: GET_REPOS,
    payload: {
      request: {
        url: `/comics?ts=1&limit=${qtd}&apikey=393873639fd708d7b7caa80faa8e0b96&hash=af1a368c4b838d0cf73e305448a62d15`
      }
    }
  };
}