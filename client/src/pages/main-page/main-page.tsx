import { JSX, useMemo, useState } from "react";
import { Logo } from "../../components/logo/logo";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { OffersList } from "../../types/offer";
import { Map } from "../../components/map/map";
import { MapPoint } from "../../types/map";
import { CitiesList } from "../../components/cities-list/cities-list";
import { CITIES_LOCATION, SortOffersType, AuthorizationStatus } from "../../const";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUserEmail } from '../../store/selectors';
import { CityOffer } from "../../types/offer";
import { City } from "../../types/map";
import { SortOffer } from "../../types/sort";
import { SortOptions } from "../../components/sort-options/sort-options";

type MainPageProps = {
    rentalOffersCount: number;
    offersList: OffersList[];
    favoritesCount: number;
}

function MainPage({ rentalOffersCount, offersList, favoritesCount }: MainPageProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [selectedPoint, setSelectedPoint] = useState<MapPoint | undefined>(undefined);
    const [selectedSort, setSelectedSort] = useState<SortOffer>('Popular');
    const authorizationStatus = useAppSelector(getAuthorizationStatus);
    const userEmail = useAppSelector(getUserEmail);

    // Получаем объект выбранного города из Redux (state.city)
    const selectedCity = useAppSelector((state) => (state as any).city) as CityOffer | undefined;

    // Если в стейте нет города - используем Paris из CITIES_LOCATION (фолбек)
    const selectedCityOffer = selectedCity ?? CITIES_LOCATION.find((c) => c.name === 'Paris')!;

    const selectedCityName = selectedCityOffer.name;

    // Фильтруем предложения по выбранному городу
    const cityOffers = useMemo(() => {
      const filtered = offersList.filter(offer => offer.city.name === selectedCityName);

      switch (selectedSort) {
        case 'PriceToHigh':
          return [...filtered].sort((a, b) => a.price - b.price);
        case 'PriceToLow':
          return [...filtered].sort((a, b) => b.price - a.price);
        case 'TopRated':
          return [...filtered].sort((a, b) => b.rating - a.rating);
        case 'Popular':
        default:
          return filtered; // исходный порядок
      }
    }, [offersList, selectedCityName, selectedSort]);

    // Преобразуем предложения в точки для карты (карта не зависит от порядка)
    const mapPoints: MapPoint[] = cityOffers.map(offer => ({
        id: offer.id,
        title: offer.title,
        lat: offer.location.latitude,
        lng: offer.location.longitude
    }));

    const handleCardMouseEnter = (id: string) => {
        const point = mapPoints.find((point) => point.id === id);
        setSelectedPoint(point);
    };

    const handleCardMouseLeave = () => {
        setSelectedPoint(undefined);
    };

    // Подготовить объект City для компонента Map
    const mapCity: City = {
        title: selectedCityOffer.name,
        lat: selectedCityOffer.location.latitude,
        lng: selectedCityOffer.location.longitude,
        zoom: selectedCityOffer.location.zoom,
    };

    return (
        <div className="page page--gray page--main">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                {authorizationStatus === AuthorizationStatus.Auth ? (
                                    <>
                                        <li className="header__nav-item user">
                                            <a className="header__nav-link header__nav-link--profile" href="/favorites">
                                                <div className="header__avatar-wrapper user__avatar-wrapper">
                                                </div>
                                                <span className="header__user-name user__name">{userEmail}</span>
                                                <span className="header__favorite-count">{ favoritesCount }</span>
                                            </a>
                                        </li>
                                        <li className="header__nav-item">
                                            <a
                                                className="header__nav-link"
                                                href="/login"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(logoutAction());
                                                }}
                                            >
                                                <span className="header__signout">Sign out</span>
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <li className="header__nav-item">
                                        <a className="header__nav-link" href="/login">
                                            <span className="header__login">Sign in</span>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <CitiesList selectedCity={selectedCityOffer} />
                    </section>
                </div>
                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places">
                            <h2 className="visually-hidden">Places</h2>
                            <b className="places__found">{cityOffers.length} places to stay in {selectedCityName}</b>

                            {/* Сортировка — компонент */}
                            <SortOptions selectedSort={selectedSort} onChange={setSelectedSort} />

                            <CitiesCardList 
                                offersList={cityOffers}
                                onCardMouseEnter={handleCardMouseEnter}
                                onCardMouseLeave={handleCardMouseLeave}
                            />
                        </section>
                        <div className="cities__right-section">
                            <Map 
                                city={mapCity}
                                points={mapPoints}
                                selectedPoint={selectedPoint}
                                className="cities__map map"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export { MainPage };