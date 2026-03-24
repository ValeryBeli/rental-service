import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';


const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
  token: 'fake-token',
};


describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });


  it('не отображает Sign out', () => {
    renderWithProviders(<Header />);
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('показывает email, количество избранных и Sign out', () => {
    const storeOverrides = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: fakeUserInfo.email,
    };

    renderWithProviders(<Header favoritesCount={3} />, { storeOverrides });

    expect(screen.getByText(fakeUserInfo.email)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});

describe('Header — неизвестный статус', () => {
  it('показывает Sign in при Unknown', () => {
    const storeOverrides = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };

    renderWithProviders(<Header />, { storeOverrides });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
