import { createReducer } from '@reduxjs/toolkit';
import { offersList } from '../mocks/offers-list';
import { AuthorizationStatusType, changeCity, offersCityList, requireAuthorization, setError } from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { getCity } from '../utils';
import { CityOffer, OffersList } from '../types/offer';
import { setOffersDataLoadingStatus } from './action';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
           state.isOffersDataLoading = action.payload;
    })

});

export default reducer;