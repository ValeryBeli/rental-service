import { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: '1',
    title: 'Luxurious apartment in historic district',
    type: 'apartment',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    description: 'A stunning apartment in the heart of historic Amsterdam with modern amenities and classic charm.',
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
      'Balcony'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-small-03.jpg',
      'img/apartment-small-04.jpg',
      'img/room.jpg'
    ],
    maxAdults: 3
  },
  {
    id: '2',
    title: 'Cozy studio with city view',
    type: 'room',
    price: 75,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    description: 'Compact and comfortable studio perfect for solo travelers looking to explore the city.',
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchenette',
      'Fridge',
      'TV'
    ],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    images: [
      'img/room.jpg',
      'img/apartment-03.jpg'
    ],
    maxAdults: 1
  },
  {
    id: '3',
    title: 'Modern loft in city center',
    type: 'apartment',
    price: 145,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    description: 'Contemporary loft space with open layout and premium finishes in the vibrant city center.',
    bedrooms: 3,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Smart TV',
      'Fridge',
      'Workspace'
    ],
    host: {
      name: 'Maria',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg'
    ],
    maxAdults: 4
  },
  {
    id: '4',
    title: 'Charming house with garden',
    type: 'house',
    price: 195,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.1,
    description: 'Quaint house featuring a private garden and traditional architecture with modern comforts.',
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Garden',
      'Parking',
      'Terrace'
    ],
    host: {
      name: 'Anton',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true
    },
    images: [
      'img/apartment-small-03.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 4
  }
];