import { describe, it, expect } from 'vitest';
import { getOffersByCity, sortOffersByType, getCity, getImageSrc, normalizeOffer } from '../utils';
import { makeFakeOffer, makeFakeFullOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';


describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES_LOCATION[0];
    const cologne = CITIES_LOCATION[1];
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };


    const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);


    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });


  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
  });


  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity('Paris', [])).toEqual([]);
  });
});

describe('getCity', () => {
  it('находит город без учёта регистра', () => {
    const city = getCity('paris', CITIES_LOCATION);
    expect(city).toBeDefined();
    expect(city?.name).toBe('Paris');
  });

  it('возвращает undefined для несуществующего города', () => {
    expect(getCity('Tokyo', CITIES_LOCATION)).toBeUndefined();
  });

  it('возвращает undefined для некорректных аргументов', () => {
    expect(getCity('', CITIES_LOCATION)).toBeUndefined();
    expect(getCity('Paris', null)).toBeUndefined();
  });
});

describe('getImageSrc', () => {
  it('возвращает пустую строку как есть', () => {
    expect(getImageSrc('')).toBe('');
  });

  it('оставляет полный URL без изменений', () => {
    expect(getImageSrc('http://example.com/img.png')).toBe('http://example.com/img.png');
  });

  it('оставляет ведущий слэш без изменений', () => {
    expect(getImageSrc('/img/foo.jpg')).toBe('/img/foo.jpg');
  });

  it('добавляет слэш к относительному пути', () => {
    expect(getImageSrc('img/foo.jpg')).toBe('/img/foo.jpg');
  });
});

describe('normalizeOffer', () => {
  it('нормализует серверный формат (author/features/rooms/guests/photos)', () => {
    const serverOffer = makeFakeFullOffer();

    const normalized = normalizeOffer(serverOffer as any);

    expect(normalized.host).toBeDefined();
    if (serverOffer.author) {
      expect((normalized.host as any).name).toBe(serverOffer.author.username);
    }
    expect(normalized.goods).toEqual(serverOffer.features || []);
    expect(normalized.bedrooms).toBe(serverOffer.rooms ?? 1);
    expect(normalized.maxAdults).toBe(serverOffer.guests ?? 1);
    expect(normalized.images).toEqual(serverOffer.photos || []);
  });

  it('сохраняет существующие поля (host/goods/bedrooms/maxAdults/images)', () => {
    const base = makeFakeFullOffer();
    const legacy = {
      ...base,
      host: { name: 'Legacy Host', avatarUrl: 'a.jpg', isPro: true },
      goods: ['x', 'y'],
      bedrooms: 2,
      maxAdults: 4,
      images: ['i1.jpg', 'i2.jpg'],
    } as any;

    const normalized = normalizeOffer(legacy);
    expect((normalized.host as any).name).toBe('Legacy Host');
    expect(normalized.goods).toEqual(['x', 'y']);
    expect(normalized.bedrooms).toBe(2);
    expect(normalized.maxAdults).toBe(4);
    expect(normalized.images).toEqual(['i1.jpg', 'i2.jpg']);
  });
});
describe('sortOffersByType', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.PriceToHigh);


    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });


  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.PriceToLow);


    expect(result[0].price).toBe(300);
  });


  it('сортирует по рейтингу (Popular)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];


    const result = sortOffersByType([...offers], SortOffersType.Popular);


    expect(result[0].rating).toBe(5);
  });


  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];


    const copy = [...offers];


    sortOffersByType(offers, SortOffersType.PriceToHigh);


    expect(offers).toEqual(copy);
  });

  it('возвращает пустой массив при пустом списке (sortOffersByType)', () => {
    const result = sortOffersByType([], SortOffersType.PriceToHigh);
    expect(result).toEqual([]);
  });
});
