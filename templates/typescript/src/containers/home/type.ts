// get list user events
export const GET_LIST_USER_START = 'GET_LIST_USER_START';
export const GET_LIST_USER_SUCCESS = 'GET_LIST_USER_SUCCESS';
export const GET_LIST_USER_FAILURE = 'GET_LIST_USER_FAILURE';

// Declare type actions.
interface SuccessActions {
  type: string,
  payload: object,
}
interface FailureAction {
  type: string,
  error: object,
}

export type HomepageActionTypes = SuccessActions | FailureAction