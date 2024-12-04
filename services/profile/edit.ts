
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import * as secureStore from 'expo-secure-store';
import { baseUrl } from '../../constants/baseurl';
import { UserImage } from '../../components/internship/apply';
import { useError } from '../../providers/error';

interface Profile {
    address: string;
    email: string; 
    mobileno: string;
    profile_pic: UserImage | null
}

const updateProfile = async (data: Profile) => {
    const token = await secureStore.getItemAsync('token').then((data) => data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const url = baseUrl + 'api/auth/update';

    const form = new FormData();

    form.append('address', data.address);
    form.append('email', data.email);
    form.append('mobileno', data.mobileno);
    if (data.profile_pic) {
        form.append('profile_pic', data.profile_pic as unknown as Blob);
    }


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

const useProfileUpdate = () => {
    const { handleError } = useError()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['authenticated-user'],
            });
        },
        onError: () => {
            handleError('Invalid email or password');
        },

    });
};

export default useProfileUpdate;
