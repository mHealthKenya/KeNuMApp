import * as LocalAuthentication from 'expo-local-authentication';
import * as secureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Pressable, ViewProps, Text } from 'react-native';
import { useAuth } from '../../providers/auth';
import { AllTokens, SignInMode } from '../../enums/tokens';
import { Ionicons } from '@expo/vector-icons';
import ToastSuccess from '../shared/ToastSuccess';
import ToastError from '../shared/ToastError';
import { useToast } from '@gluestack-ui/themed';

const Biometric = (props: ViewProps) => {
  const [isCompatible, setIsCompatible] = useState(false);
  const [refresh, setRefresh] = useState('');

  const { signIn } = useAuth();

  const toast = useToast()

  useEffect(() => {
    const compatible = async () => {
      const val = await LocalAuthentication.hasHardwareAsync();
      console.log("Is hardware compatible:", val);

      const refreshToken = 
        (await secureStore.getItemAsync(AllTokens.all_tokens)) || '';
      console.log("Retrieved refresh token:", refreshToken);

      // Safely split the token only if it contains "*sep*"
      const ref = refreshToken.includes('*sep*')
        ? refreshToken.split('*sep*')[0]
        : refreshToken;
      
      setIsCompatible(val);
      setRefresh(ref);
    };

    compatible();
  }, []);

  const handleBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Biometric Authentication',
      fallbackLabel: 'Could not load biometric authentication',
    });
  
    if (result.success) {
      signIn({ mode: SignInMode.local, checked: true });
      toast.show({
        render: () => <ToastSuccess title="Authentication Successful" description="Welcome Back!" id={undefined} />,
      });
    } else {
      toast.show({
        render: () => <ToastError title="Authentication failed" description="Please try again!!" id={undefined}/>,
      });
    }
  };

  console.log("Final Compatibility Check:", isCompatible, "Refresh:", refresh);

  // Only render the Pressable if the device is compatible and there is a valid refresh token
  if (isCompatible) {
    return (
      <Pressable
        {...props}
        style={[props.style, { alignSelf: 'flex-end'}]}
        onPress={handleBiometric}>
        <Ionicons name="finger-print-outline" size={40} color={'#0445b5'}/>
      </Pressable>
    );
  }

  return null;
};

export default Biometric;
