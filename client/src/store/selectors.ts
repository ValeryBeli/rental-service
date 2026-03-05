import { State } from '../types/state';
import { AuthorizationStatusType } from './action';


export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
 state.authorizationStatus;

export const getUserEmail = (state: State): string | null =>
  state.userEmail;

export const getError = (state: State): string | null =>
  state.error;

export const getCurrentOffer = (state: State) =>
  state.currentOffer;

export const getOfferReviews = (state: State) =>
  state.offerReviews;

export const getIsOfferDataLoading = (state: State): boolean =>
  state.isOfferDataLoading;
