import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { RENTAL_OFFERS_COUNT } from './const';
import offers from './mocks/offers';
import offersList from './mocks/offers-list';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App 
      rentalOffersCount={RENTAL_OFFERS_COUNT}
      offers={offers}
      offersList={offersList}
    />
  </React.StrictMode>,
);