import { Logo } from "../../components/logo/logo";
import { FullOffer, OffersList } from "../../types/offer";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { useParams } from "react-router-dom";
import { ReviewsForm } from "../../components/reviews-form/reviews-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import { Map } from "../../components/map/map";
import { MapPoint } from "../../types/map";
import { /*reviewsData*/ } from "../../mocks/reviews-data";
import { NearPlacesList } from "../../components/near-places-list/near-places-list";
import { useState, useEffect } from 'react';
import { getImageSrc, normalizeOffer } from '../../utils';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUserEmail, getCurrentOffer, getOfferReviews, getIsOfferDataLoading } from "../../store/selectors";
import { fetchOfferAction, fetchOfferReviewsAction, postReviewAction } from '../../store/api-action';
import { setCurrentOffer } from '../../store/action';
import { AuthorizationStatus } from "../../const";
import { LoadingPage } from "../../components/loading-page/loading-page";
import { City } from "../../types/map";
import { Review } from "../../types/review";

type OfferPageProps = {
  offers: FullOffer[];
  offersList: OffersList[];
  favoritesCount: number;
}

function OfferPage({ offers, offersList, favoritesCount }: OfferPageProps){
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const params = useParams();
  const currentOffer = useAppSelector(getCurrentOffer) as FullOffer | null;
  const offerReviews = useAppSelector(getOfferReviews);
  const isOfferLoading = useAppSelector(getIsOfferDataLoading);

  const [selectedPoint, setSelectedPoint] = useState<MapPoint | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const id = params.id;
    if (!id) return;
    const local = offers.find((o) => o.id === id);
    // Если предложение уже есть в props `offers`, не делаем запрос за оффером
    if (!local) {
      dispatch(fetchOfferAction(id));
    } else {
      // Подставим локальные данные в стор для единообразия отображения
      dispatch(setCurrentOffer(local as any));
    }
    // Комментарии запрашиваем всегда (может быть пустой список)
    dispatch(fetchOfferReviewsAction(id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (offerReviews) setReviews(offerReviews);
  }, [offerReviews]);

  // API и мок-данные могут использовать разные имена свойств. Когда
  // пришёл ответ с сервера мы преобразуем его в FullOffer, но на всякий
  // случай подстраховываемся здесь: если данных нет, пытаемся взять
  // тот же объект, что пришёл по prop `offers`.
  let offer = currentOffer ?? offers.find((item) => item.id === params.id);
  
  // Нормализуем offer так, чтобы он имел необходимые поля независимо от источника (сервер или мок)
  if (offer) {
    offer = normalizeOffer(offer);
  }

  if (isOfferLoading) {
    return <LoadingPage /> as unknown as JSX.Element;
  }

  if (!offer){
    return <NotFoundPage/>;
  }

  // Берём все предложения из того же города (кроме текущего offer)
  const nearbyOffers = offersList
    .filter(item => item.city.name === offer.city.name && item.id !== offer.id);

  // Преобразуем в точки для карты — текущий offer + все предложения этого же города
  const mapPoints: MapPoint[] = [
    {
      id: offer.id,
      title: offer.title,
      lat: offer.location.latitude,
      lng: offer.location.longitude
    },
    ...nearbyOffers.map((o) => ({
      id: o.id,
      title: o.title,
      lat: o.location.latitude,
      lng: o.location.longitude
    }))
  ];

  const handleCardMouseEnter = (id: string) => {
    const point = mapPoints.find((point) => point.id === id);
    setSelectedPoint(point);
  };

  const handleCardMouseLeave = () => {
    setSelectedPoint(undefined);
  };

  // картинки могут приходить либо в поле `images` (моки) либо в `photos`
  // (ответ с реального API). Используем первое, которое есть.
  const galleryImages = ((offer as any).images || (offer as any).photos || []).slice(0, 6);

  // Подготовить объект City для компонента Map на основе offer.city
  const mapCity: City = {
    title: offer.city.name,
    lat: offer.city.location.latitude,
    lng: offer.city.location.longitude,
    zoom: offer.city.location.zoom,
  };

  const handleAddReview = async (newReview: Review): Promise<void> => {
    const id = params.id;
    if (!id) {
      throw new Error('Offer ID is missing');
    }
    
    try {
      const result = await dispatch(postReviewAction({ 
        offerId: id, 
        comment: newReview.comment, 
        rating: newReview.rating 
      }));
      
      // Проверяем был ли успех (createAsyncThunk возвращает fulfilled или rejected action)
      if (result.type.includes('rejected')) {
        throw new Error('Failed to post review');
      }
    } catch (error) {
      throw error;
    }
  };

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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img 
                    className="offer__image" 
                    src={getImageSrc(image)} 
                    alt="Photo studio" 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="/img/sprite.svg#icon-bookmark" style={offer.isFavorite ? {stroke: '#4481c3', fill: '#4481c3'} : {}}></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img 
                      className="offer__avatar user__avatar" 
                      src={getImageSrc(offer.host.avatarUrl)} 
                      width="74" 
                      height="74" 
                      alt="Host avatar" 
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              
              <ReviewsList reviews={reviews} />
              {authorizationStatus === AuthorizationStatus.Auth && (
                <ReviewsForm onSubmit={handleAddReview} />
              )}
            </div>
          </div>
          <section className="offer__map">
            <Map 
              city={mapCity}
              points={mapPoints}
              selectedPoint={selectedPoint || {
                id: offer.id,
                title: offer.title,
                lat: offer.location.latitude,
                lng: offer.location.longitude
              }}
            />
          </section>
        </section>
        <div className="container">
          <NearPlacesList 
            offers={nearbyOffers}
            onCardMouseEnter={handleCardMouseEnter}
            onCardMouseLeave={handleCardMouseLeave}
          />
        </div>
      </main>
    </div>
  );
}

export { OfferPage };