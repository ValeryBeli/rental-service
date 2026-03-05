import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatusType, changeCity, offersCityList, requireAuthorization, setUserInfo, setCurrentOffer, setOfferReviews, setOfferDataLoadingStatus, setError, setUserDataLoadingStatus, updateOfferRating } from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { getCity } from '../utils';
import { CityOffer, OffersList, FullOffer } from '../types/offer';
import { setOffersDataLoadingStatus } from './action';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  authorizationStatus: AuthorizationStatusType;
  userEmail: string | null;
  error: string | null;
  isOffersDataLoading: boolean;
  currentOffer: FullOffer | null;
  offerReviews: any[];
  isOfferDataLoading: boolean;
  isUserDataLoading: boolean;
}

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  error: null,
  isOffersDataLoading: false,
  currentOffer: null,
  offerReviews: [],
  isOfferDataLoading: false,
  isUserDataLoading: true
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload; 
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
           state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserDataLoadingStatus, (state, action) => {
           state.isUserDataLoading = action.payload;
    })
    .addCase(updateOfferRating, (state, action) => {
      if (state.currentOffer) {
        state.currentOffer.rating = action.payload;
      }
    })

});

export default reducer;