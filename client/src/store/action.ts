import { createAction } from "@reduxjs/toolkit";
import { CityOffer, OffersList} from "../types/offer";
import { AuthorizationStatus } from '../const';


const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setUserInfo = createAction<string>('user/setUserInfo');
const setCurrentOffer = createAction('offer/setCurrentOffer', (offer: any) => ({ payload: offer }));
const setOfferReviews = createAction('offer/setOfferReviews', (reviews: any[]) => ({ payload: reviews }));
const setOfferDataLoadingStatus = createAction<boolean>('offer/setOfferDataLoadingStatus');

const setError = createAction('setError', (error: string | null) =>({
    payload:error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

const setUserDataLoadingStatus = createAction<boolean>('user/setUserDataLoadingStatus');

const updateOfferRating = createAction<number>('offer/updateOfferRating');

export {
    changeCity,
    offersCityList,
    requireAuthorization,
    setUserInfo,
    setCurrentOffer,
    setOfferReviews,
    setOfferDataLoadingStatus,
    setError,
    setOffersDataLoadingStatus,
    setUserDataLoadingStatus,
    updateOfferRating
};

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];