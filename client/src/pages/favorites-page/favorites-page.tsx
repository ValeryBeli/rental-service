import { FavoritesCardList } from "../../components/favorites-card-list/favorites-card-list";
import { FavoritesCard } from "../../components/favorites-card/favorites-card";
import { Logo } from "../../components/logo/logo";
import { OffersList } from "../../types/offer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUserEmail } from "../../store/selectors";
import { AuthorizationStatus } from "../../const";

type FavoritesPageProps = {
    offersList: OffersList[];
    favoritesCount: number;
}

function FavoritesPage({ offersList, favoritesCount }: FavoritesPageProps) {
  const dispatch = useAppDispatch();    const authorizationStatus = useAppSelector(getAuthorizationStatus);
    const userEmail = useAppSelector(getUserEmail);        return(
        <div className="page">
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
                        onClick={(e) => { e.preventDefault(); dispatch(logoutAction()); }}
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesCardList offersList={offersList} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="Rent service logo" width="64" height="33" />
        </a>
      </footer>
    </div>
    );
}

export { FavoritesPage }