import { MainPage } from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { PrivateRoute } from "../private-route/private-route";
import { FullOffer, OffersList} from "../../types/offer";
import { AppRoute, AuthorizationStatus } from "../../const";
import { JSX } from "react";

type AppMainPageProps = {
    rentalOffersCount: number;
    offers: FullOffer[];
    offersList: OffersList[];
}

function App({ rentalOffersCount, offers, offersList }: AppMainPageProps): JSX.Element {
    const favoritesCount = offersList.filter((o) => o.isFavorite).length;
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoute.Main}
                    element={<MainPage rentalOffersCount={rentalOffersCount} offersList={offersList} favoritesCount={favoritesCount}/>}
                />
                <Route
                    path={AppRoute.Login}
                    element={<LoginPage />}
                />
                <Route
                    path={`${AppRoute.Offer}/:id`} 
                    element={<OfferPage offers={offers} offersList={offersList} favoritesCount={favoritesCount}/>}
                />
                <Route
                    path={AppRoute.Favorites}
                    element={
                        <PrivateRoute
                            authorizationStatus={AuthorizationStatus.Auth}
                        >
                            <FavoritesPage offersList={offersList.filter((o) => o.isFavorite)} favoritesCount={favoritesCount}/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;