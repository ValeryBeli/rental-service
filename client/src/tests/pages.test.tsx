import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { AppRoute } from '../const';

describe('LoadingPage', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingPage />);
    // Компонент может быть на русском или английском — проверим оба варианта
    expect(screen.getByText(/загрузка|loading/i)).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  const renderPage = () => render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  it('отображает сообщение о том, что страница не найдена', () => {
    renderPage();
    expect(screen.getByText(/страниц[ая] не найдена|page not found/i)).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /на главную|главную страницу|main/i })).toBeInTheDocument();
  });

  it('ссылка ведет на "/"', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /на главную|главную страницу|main/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});
