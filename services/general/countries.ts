import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { Countries } from '../../models/countries';

const allCountries = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/countries/all';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: Countries = await axios(config).then((res) => {
        return res.data;
    });

    return response;
};

const useCountries = () =>
    useQuery({
        queryKey: ['all-countries'],
        queryFn: allCountries,
    });

export default useCountries;
