
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { ProposedPractice } from '../../models/proposedprcactice';
import { useQuery } from '@tanstack/react-query';
const getProposedPrivatePracticeModes = async () => {

    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/privatepractice/proposed';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: ProposedPractice = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}

const useProposed = () => useQuery({
    queryKey: ['proposed-practice'],
    queryFn: getProposedPrivatePracticeModes,
})

export default useProposed;