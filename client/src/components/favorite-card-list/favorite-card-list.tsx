import { FavoriteCard } from '../favorite-card/favorite-card';
import { OfferList } from '../../types/offer';

type FavoriteCardListProps = {
  offersList: OfferList;
}

function FavoriteCardList({ offersList }: FavoriteCardListProps) {
  const offersByCity: Record<string, typeof offersList> = {};
  
  offersList.forEach((offer) => {
    if (!offersByCity[offer.city]) {
      offersByCity[offer.city] = [];
    }
    offersByCity[offer.city].push(offer);
  });

  return (
    <ul className="favorites__list">
      {Object.entries(offersByCity).map(([city, cityOffers]) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavoriteCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                type={offer.type}
                price={offer.price}
                isPremium={offer.isPremium}
                previewImage={offer.previewImage}
                rating={offer.rating}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoriteCardList };