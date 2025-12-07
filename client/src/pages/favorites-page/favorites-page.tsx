import { FavoritesCardList } from "../../components/favorites-card-list/favorites-card-list";
import { FavoritesCard } from "../../components/favorites-card/favorites-card";
import { Logo } from "../../components/logo/logo";
import { OffersList } from "../../types/offer";

type FavoritesPageProps = {
    offersList: OffersList[];
}

function FavoritesPage({ offersList }: FavoritesPageProps) {
    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">3</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    <section className="favorites">
                        <h1 className="favorites__title">Saved listing</h1>
                        <ul className="favorites__list">
                            <li className="favorites__locations-items">
                                <div className="favorites__locations locations locations--current">
                                    <div className="locations__item">
                                        <a className="locations__item-link" href="#">
                                            <span>Amsterdam</span>
                                        </a>
                                    </div>
                                </div>
                                <FavoritesCardList offersList={offersList}/>
                            </li>

                            <li className="favorites__locations-items">
                                <div className="favorites__locations locations locations--current">
                                    <div className="locations__item">
                                        <a className="locations__item-link" href="#">
                                            <span>Cologne</span>
                                        </a>
                                    </div>
                                </div>
                                <FavoritesCardList offersList={offersList}/>
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
            <footer className="footer container">
                <a className="footer__logo-link" href="main.html">
                    <img className="footer__logo" src="img/logo.svg" alt="Rent service logo" width="64" height="33" />
                </a>
            </footer>
        </div>
    );
}

export { FavoritesPage }