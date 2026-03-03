import { State } from '../types/state';
import { AuthorizationStatusType } from './action';


export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
 state.authorizationStatus;
