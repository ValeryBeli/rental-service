export const RENTAL_OFFERS_COUNT = 312;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export default {
  RENTAL_OFFERS_COUNT,
  AppRoute,
  AuthorizationStatus,
};