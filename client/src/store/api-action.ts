import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { OffersList } from '../types/offer.js';
import { offersCityList, requireAuthorization, setUserInfo, setError, setOffersDataLoadingStatus, setUserDataLoadingStatus, setCurrentOffer, setOfferReviews, setOfferDataLoadingStatus, updateOfferRating, setOfferFavorite } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { getToken } from '../services/token';
import { AuthData, UserData } from '../types/user-data';
import { TIMEOUT_SHOW_ERROR } from '../const';

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<OffersList[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(offersCityList(data));
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const token = getToken();
    // если токена нет, не делаем запроса, просто помечаем пользователя как неавторизованного
    if (!token) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserDataLoadingStatus(false));
      return;
    }

    dispatch(setUserDataLoadingStatus(true));
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserInfo(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } finally {
      dispatch(setUserDataLoadingStatus(false));
    }
  },
);

const loginAction = createAsyncThunk<
    UserData,
    AuthData,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
    > (
    'user/login',
    async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
            saveToken(data.token);
            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            dispatch(setUserInfo(data.email));
            // Вызываем checkAuthAction после логина для полной загрузки данных пользователя
            dispatch(checkAuthAction());
            return data;
        } catch (err) {
            dropToken();
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            return rejectWithValue('Login failed');
        }
    }
);

        const toggleFavoriteAction = createAsyncThunk<void, {offerId: string; currentStatus: boolean}, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
        }>(
          'offer/toggleFavorite',
          async ({ offerId, currentStatus }, { dispatch, extra: api, rejectWithValue }) => {
            try {
              // server expects status as '1' to mark favorite, '0' otherwise
              const newStatus = currentStatus ? 0 : 1;
              const { data } = await api.post(`/favorite/${offerId}/${newStatus}`);
              // Update client state: server returns the offer
              dispatch(setOfferFavorite(offerId, data.isFavorite));
            } catch (error: any) {
              const errorMessage = error?.response?.data?.message || 'Не удалось обновить избранное';
              dispatch(setError(errorMessage));
              return rejectWithValue(errorMessage);
            }
          }
        );

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserInfo(''));
  },
);

const clearErrorAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'clearError',
    async (_arg, {dispatch}) => {
        setTimeout(
            () => dispatch(setError(null)),
            TIMEOUT_SHOW_ERROR
        );
    }
);
        const fetchOfferAction = createAsyncThunk<void, string, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
        }>(
          'offer/fetchOffer',
          async (offerId, { dispatch, extra: api }) => {
            dispatch(setOfferDataLoadingStatus(true));
            try {
              const { data } = await api.get(`${APIRoute.Offers}/${offerId}`);
              dispatch(setCurrentOffer(data));
            } catch (error: any) {
              dispatch(setCurrentOffer(null as any));
              // Если сервер вернул 400 (offer not found), не показываем глобальное уведомление
              if (error?.response?.status !== 400) {
                dispatch(setError('Не удалось загрузить предложение'));
              }
            } finally {
              dispatch(setOfferDataLoadingStatus(false));
            }
          }
        );

        const fetchOfferReviewsAction = createAsyncThunk<void, string, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
        }>(
          'offer/fetchOfferReviews',
          async (offerId, { dispatch, extra: api, getState }) => {
            try {
              const { data } = await api.get(`/reviews/${offerId}`);
              dispatch(setOfferReviews(data));
              
              // Пересчитываем средний рейтинг на основе отзывов
              if (data && data.length > 0) {
                const averageRating = data.reduce((sum: number, review: any) => sum + review.rating, 0) / data.length;
                // Округляем до одного знака после запятой
                const roundedRating = Math.round(averageRating * 10) / 10;
                dispatch(updateOfferRating(roundedRating));
              }
            } catch (error) {
              dispatch(setOfferReviews([]));
              dispatch(setError('Не удалось загрузить комментарии'));
            }
          }
        );

        const postReviewAction = createAsyncThunk<void, {offerId: string; comment: string; rating: number}, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
        }>(
          'offer/postReview',
          async ({ offerId, comment, rating }, { dispatch, extra: api, rejectWithValue }) => {
            try {
              await api.post(`/reviews/${offerId}`, { comment, rating });
              // После успешного поста — обновляем список комментариев
              await dispatch(fetchOfferReviewsAction(offerId));
            } catch (error: any) {
              const errorMessage = error?.response?.data?.message || 'Не удалось отправить отзыв';
              dispatch(setError(errorMessage));
              return rejectWithValue(errorMessage);
            }
          }
        );

        export { fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction, fetchOfferAction, fetchOfferReviewsAction, postReviewAction, toggleFavoriteAction };
