import { OffersList } from "../../types/offer"
import { FavoritesCard } from "../favorites-card/favorites-card";

type FavoritesCardListProps = {
    offersList: OffersList[];
}

function FavoritesCardList({ offersList }: FavoritesCardListProps) {
  const grouped: Record<string, OffersList[]> = {};
  offersList.forEach((f) => {
    const name = f.city.name;
    if (!grouped[name]) {
      grouped[name] = [];
    }
    grouped[name].push(f);
  });

   return (
    <ul className="favorites__list">
      {Object.entries(grouped).map(([city, offers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((o) => (
              <FavoritesCard key={o.id}
                id={o.id}
                title={o.title}
                type={o.type}
                price={o.price}
                previewImage={o.previewImage}
                isPremium={o.isPremium}
                rating={o.rating}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoritesCardList }