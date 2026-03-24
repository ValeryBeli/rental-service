import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './render-with-providers';
import { CitiesCard } from '../components/cities-card/cities-card';

describe('CitiesCard', () => {
  const defaultProps = {
    id: 'offer-1',
    title: 'Lovely Apartment',
    type: 'apartment',
    price: 123,
    isPremium: false,
    previewImage: 'img/foo.jpg',
    rating: 4.5,
    isFavorite: false,
    onCardMouseEnter: () => {},
    onCardMouseLeave: () => {},
  } as const;

  it('заголовок объявления отображается на карточке', () => {
    renderWithProviders(<CitiesCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    renderWithProviders(<CitiesCard {...defaultProps} />);
    expect(screen.getByText(/€123/)).toBeInTheDocument();
  });

  it('метка "Premium" отображается когда isPremium = true', () => {
    renderWithProviders(<CitiesCard {...defaultProps} isPremium={true} /> as any);
    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  it('метка "Premium" отсутствует когда isPremium = false', () => {
    renderWithProviders(<CitiesCard {...defaultProps} isPremium={false} /> as any);
    expect(screen.queryByText(/premium/i)).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
    renderWithProviders(<CitiesCard {...defaultProps} />);
    const titleLink = screen.getByRole('link', { name: defaultProps.title });
    expect(titleLink).toHaveAttribute('href', `/offer/${defaultProps.id}`);
  });
});
