import { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  {
    id: '1',
    title: 'Cozy apartment in the city center',
    type: 'apartment',
    price: 160,
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
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Nice room for tourists',
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
    previewImage: '/img/room.jpg'
  },
  {
    id: '3',
    title: 'Modern apartment near the airport',
    type: 'apartment',
    price: 145,
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
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-03.jpg'
  },
  {
    id: '4',
    title: 'A cozy home for the company',
    type: 'house',
    price: 195,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.1,
    previewImage: '/img/apartment-02.jpg'
  },

  // Paris
  {
    id: '5',
    title: 'Charming flat near the Seine',
    type: 'apartment',
    price: 130,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13
      }
    },
    location: {
      latitude: 48.8584,
      longitude: 2.3469,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.6,
    previewImage: '/img/apartment-03.jpg'
  },
  {
    id: '10',
    title: 'Elegant studio near Latin Quarter',
    type: 'studio',
    price: 110,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13
      }
    },
    location: {
      latitude: 48.8500,
      longitude: 2.3460,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/apartment-small-03.jpg'
  },
  {
    id: '11',
    title: 'Sunny flat with Eiffel view',
    type: 'apartment',
    price: 180,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13
      }
    },
    location: {
      latitude: 48.8606,
      longitude: 2.3376,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-01.jpg'
  },

  // Cologne
  {
    id: '6',
    title: 'Comfortable studio in Cologne center',
    type: 'studio',
    price: 95,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13
      }
    },
    location: {
      latitude: 50.9379,
      longitude: 6.9600,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/apartment-small-03.jpg'
  },
  {
    id: '12',
    title: 'Bright apartment next to cathedral',
    type: 'apartment',
    price: 125,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13
      }
    },
    location: {
      latitude: 50.9400,
      longitude: 6.9570,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: '/img/apartment-02.jpg'
  },
  {
    id: '13',
    title: 'Cozy room near Rhine river',
    type: 'room',
    price: 85,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13
      }
    },
    location: {
      latitude: 50.9350,
      longitude: 6.9620,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/room.jpg'
  },

  // Brussels
  {
    id: '7',
    title: 'Bright apartment near Grand Place',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13
      }
    },
    location: {
      latitude: 50.8466,
      longitude: 4.3520,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/apartment-02.jpg'
  },
  {
    id: '14',
    title: 'Stylish loft in historic quarter',
    type: 'loft',
    price: 140,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13
      }
    },
    location: {
      latitude: 50.8520,
      longitude: 4.3490,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '15',
    title: 'Comfortable small flat near Sablon',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13
      }
    },
    location: {
      latitude: 50.8480,
      longitude: 4.3525,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/apartment-small-04.jpg'
  },

  // Hamburg
  {
    id: '8',
    title: 'Modern loft in Hamburg HafenCity',
    type: 'loft',
    price: 150,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5489,
      longitude: 9.9940,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-01.jpg'
  },
  {
    id: '16',
    title: 'Charming flat near Elbe',
    type: 'apartment',
    price: 135,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5530,
      longitude: 9.9900,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: '/img/apartment-03.jpg'
  },
  {
    id: '17',
    title: 'Compact room for business travelers',
    type: 'room',
    price: 90,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5500,
      longitude: 9.9950,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/room.jpg'
  },

  // Dusseldorf
  {
    id: '9',
    title: 'Quiet house near the Rhine',
    type: 'house',
    price: 170,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2300,
      longitude: 6.7750,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/apartment-small-04.jpg'
  },
  {
    id: '18',
    title: 'Modern apartment in city center',
    type: 'apartment',
    price: 150,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2285,
      longitude: 6.7710,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/apartment-02.jpg'
  },
  {
    id: '19',
    title: 'Cozy studio near Königsallee',
    type: 'studio',
    price: 110,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2260,
      longitude: 6.7740,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/apartment-small-03.jpg'
  }
];