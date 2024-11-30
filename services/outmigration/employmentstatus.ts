import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { EmploymentStatus } from '../../models/employment';

const employmentStatus = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/outmigration/employmentstatus';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: EmploymentStatus = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const useEmploymentStatus = () => useQuery({
    queryKey: ['employment-status'],
    queryFn: employmentStatus,

})

export default useEmploymentStatus;