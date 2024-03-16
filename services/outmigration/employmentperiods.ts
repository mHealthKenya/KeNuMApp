import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { MaritalStatus } from '../../models/maritalstatus';
import { EmploymentPeriods } from '../../models/employment';

const employmentPeriods = async () => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/outmigration/employmentperiods';

    const config: AxiosRequestConfig = {
        method: 'GET',
        url,
    };

    const response: EmploymentPeriods = await axios(config).then((res) => {
        return res.data;
    });

    return response;
}


const useEmploymentPeriods = () => useQuery({
    queryKey: ['employment-periods'],
    queryFn: employmentPeriods,

})

export default useEmploymentPeriods;