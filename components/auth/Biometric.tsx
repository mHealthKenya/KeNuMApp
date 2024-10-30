import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pressable } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication';
import * as secureStore from 'expo-secure-store'
import { AllTokens } from '../../enums/tokens';

const Biometric = () => {
    const [isCompatible, setIsCompatible] = useState(false)
    const [refresh, setRefresh] = useState('')

    useEffect(() => {
        const compatible = async () => {
            const val = await LocalAuthentication.hasHardwareAsync();

             const refreshToken = (await secureStore.getItemAsync(AllTokens.all_tokens).then((data) => data)) || '';
             const ref = refreshToken.split('*sep*')[0]
             setIsCompatible(val)
             setRefresh(ref)
        }

        compatible()
    }, [])

    const handleBiometricLogin = async () => {
        LocalAuthentication.authenticateAsync({
            promptMessage: 'Please authenticate to access the app',
            fallbackLabel: 'Could not authenticate',
        }).then(async () => {
            await secureStore.setItemAsync(AllTokens.all_tokens, `${refresh}*sep*biometric`)
        })
    }
  return (
    <View className="flex flex-row">
                        <Pressable className="ml-auto" onPress={() => console.log('Hello World')}>
                            <Ionicons name="finger-print-outline" color="#0445b5" size={30} />
                        </Pressable>
   </View>
  )
}

export default Biometric

const styles = StyleSheet.create({})
