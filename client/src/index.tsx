import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  App  from './components/app/app';
import { Setting } from './const';
import { store } from './store';
import { ErrorMessage } from './components/error-message/error-message';
import { checkAuthAction, fetchOffersAction } from './store/api-action';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ErrorMessage/>
        <App
        rentalOffersCount={ Setting.rentOffersCount }
        />
        </Provider>
    </React.StrictMode>
);

