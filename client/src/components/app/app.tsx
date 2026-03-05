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
import { useAppSelector } from '../../hooks';
import { LoadingPage } from '../loading-page/loading-page';


type AppMainPageProps = {
    rentalOffersCount: number;
}

function App({ rentalOffersCount }: AppMainPageProps): JSX.Element {
    const offersList = useAppSelector((state) => (state as any).offers) as OffersList[];
    const favoritesCount = offersList.filter((o) => o.isFavorite).length;
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const userEmail = useAppSelector((state) => state.userEmail);
    const isQuestionsDataLoading = useAppSelector((state) => state.isOffersDataLoading);
    const isUserDataLoading = useAppSelector((state) => state.isUserDataLoading);
    
    // Показываем LoadingPage если:
    // 1. Статус авторизации не определён (неизвестен)
    // 2. Офферы загружаются
    // 3. Авторизированы, но email ещё не загружен
    if (
        authorizationStatus === AuthorizationStatus.Unknown || 
        isQuestionsDataLoading || 
        (authorizationStatus === AuthorizationStatus.Auth && !userEmail)
    ) {
        return (
            <LoadingPage />
        );
    }
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
                    element={<OfferPage offers={[]} offersList={offersList} favoritesCount={favoritesCount}/>} 
                />
                <Route
                    path={AppRoute.Favorites}
                    element={
                            <PrivateRoute
                            authorizationStatus={authorizationStatus}
                        >
                            <FavoritesPage offersList={offersList.filter((o) => o.isFavorite)} favoritesCount={favoritesCount}/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/404"
                    element={<NotFoundPage />}
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