import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FullOffer, OfferList } from '../../types/offer';


type AppProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
  offersList: OfferList;
}

function App({ rentalOffersCount, offers, offersList }: AppProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path={AppRoute.Main} 
          element={
            <MainPage 
              rentalOffersCount={rentalOffersCount} 
              offersList={offersList}
            />
          } 
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage offersList={offersList} />
            </PrivateRoute>
          }
        />
        <Route 
          path={AppRoute.Offer} 
          element={<OfferPage offers={offers} />} 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };