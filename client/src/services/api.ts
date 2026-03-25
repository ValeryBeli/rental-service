import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { getToken } from './token';
import { processErrorHandle } from './process-error-handle';

type DetailMessageType = {
    type: string;
    message: string;
}

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const StatusCodeMapping: Record<number, boolean> = {
    [BAD_REQUEST]: true,
    [UNAUTHORIZED]: true,
    [NOT_FOUND]: true
};

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getToken();

            if (token) {
                config.headers = config.headers || {};
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
       (error) => {
        return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<DetailMessageType>) => {
            // don't show notification for missing token when checking auth
            if (
                error.config?.url === '/login' &&
                error.response?.status === UNAUTHORIZED
            ) {
                // simply propagate the error without showing message
                return Promise.reject(error);
            }
            if (error.response && shouldDisplayError(error.response)) {
                const detailMessage = error.response.data;
                processErrorHandle(detailMessage.message);
            }
            throw error;
        }
    );


    return api;
};