import { CitiesCard } from '../cities-card/cities-card';
import { OfferList } from '../../types/offer';

type CitiesCardListProps = {
  offersList: OfferList;
}

function CitiesCardList({ offersList }: CitiesCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((offer) => (
        <CitiesCard
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
  );
}

export { CitiesCardList };