import { CityOffer } from './types/offer';
import { OffersList } from './types/offer';
import { SortOffer } from './types/sort';
import { SortOffersType } from './const';
import { FullOffer } from './types/offer';

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
    case SortOffersType.Popular:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

/**
 * Приводит URL картинки к виду, подходящему для <img src="..." />.
 *
 * Сервер возвращает либо относительный путь (например, "img/foo.jpg"),
 * либо уже полный адрес ("http://localhost:5000/static/foo.jpg"), либо
 * путь, начинающийся с «/». Правый вариант (без слэша) ломается при
 * маршрутизации: на странице `/offer/1` браузер попытается загрузить
 * `/offer/1/img/foo.jpg` и покажет совершенно чужую картинку или иконку
 * ошибки. Поэтому добавляем слэш только в случае относительного пути.
 */
export function getImageSrc(url: string): string {
  if (!url) {
    return url;
  }
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}

/**
 * Нормализует данные FullOffer от сервера к единому виду.
 * Сервер может отправлять:
 *  - author вместо host
 *  - features вместо goods
 *  - rooms вместо bedrooms
 *  - guests вместо maxAdults
 *  - photos вместо images
 * 
 * Старые моки могут содержать host/goods/bedrooms/maxAdults/images.
 * Функция приводит всё к нормализованному виду для использования в компонентах.
 */
export function normalizeOffer(offer: FullOffer): FullOffer {
  if (!offer) return offer;

  return {
    ...offer,
    // Используем новые поля сервера, если есть, иначе старые
    host: offer.host || (offer.author ? {
      name: offer.author.username,
      avatarUrl: offer.author.avatar || '',
      isPro: offer.author.userType === 'pro'
    } : undefined),
    goods: offer.goods || offer.features || [],
    bedrooms: offer.bedrooms ?? offer.rooms ?? 1,
    maxAdults: offer.maxAdults ?? offer.guests ?? 1,
    images: offer.images || offer.photos || [],
    description: offer.description || ''
  };
}
