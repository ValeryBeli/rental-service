import { CityOffer } from './types/offer';
import { OffersList } from './types/offer';
import { SortOffer } from './types/sort';
import { SortOffersType } from './const';

export function getCity(name: string, cities: CityOffer[]): CityOffer | undefined {
  if (!name || !Array.isArray(cities)) {
    return undefined;
  }
  return cities.find((city) => city.name.toLowerCase() === name.toLowerCase());
}

export function getOffersByCity(cityName: string, offers: OffersList[]): OffersList[] {
  if (!cityName || !Array.isArray(offers)) {
    return [];
  }

  const lowerName = cityName.toLowerCase();

  return offers.filter((offer) => {
    const offerCityName = offer?.city?.name;
    return typeof offerCityName === 'string' && offerCityName.toLowerCase() === lowerName;
  });
}

export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {
  switch (type) {
    case SortOffersType.PriceToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortOffersType.PriceToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortOffersType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}