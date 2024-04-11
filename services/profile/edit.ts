import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { CPDSuccess } from '../../models/cpdsuccess';

interface Profile {
    address: string;
    email: string;
    mobileno: string;
    profile_pic: any
}

const updateProfile = async (data: Profile) => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/auth/update';

    const form = new FormData();

    form.append('address', data.address);
    form.append('email', data.email);
    form.append('mobileno', data.mobileno);
    { data.profile_pic && form.append('profile_pic', data.profile_pic) }


    const config: AxiosRequestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        url,
        data: form,
    };

    const response = await axios(config).then((res) => res.data);

    return response;
};

const useProfileUpdate = (successFn: () => void, errorFn: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['authenticated-user'],
            });

            successFn();
        },

        onError: (err) => {
            console.log(err);
            errorFn();
        },
    });
};

export default useProfileUpdate;
