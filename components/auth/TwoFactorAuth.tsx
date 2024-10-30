import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import { Controller, useForm } from 'react-hook-form';
import { PinInput, PinInputRef } from '@pakenfit/react-native-pin-input';
import { Button } from '@gluestack-ui/themed';

const TwoFactorAuth = ({ isConfirmationRequired = false, onSubmit }: any) => {
    const ref = React.useRef<PinInputRef>(null);
    const { control, handleSubmit, watch, formState: { errors } } = useForm<{ pin: string; confirmPin?: string }>({
        defaultValues: {
            pin: '',
            confirmPin: '',
        },
    });
	const pin = watch("pin");

	const handlePinSubmit = (data: { pin: string; confirmPin?: string }) => {
		onSubmit(data.pin);
	};

	return (
        <SafeAreaView className='flex-1 justify-center items-center bg-white dark:bg-black'>
            <View className="flex flex-col items-center p-4">
                {!isConfirmationRequired && (
                    <>
                    <Text className="text-lg font-bold mb-4">Enter 4-Digit PIN</Text>
                    <Text className="text-md font-normal mb-4">Remaining Attempt 3/3</Text>
                    </>
                )}
                {isConfirmationRequired && (
                    <>
                        <Text className="text-lg font-bold mb-4">Create A 4-Digit PIN</Text>
                    </>
                )}
			
            <View>
                <Text className="text-md font-normal mb-4">PIN</Text>
                <Controller
                    name="pin"
                    control={control}
                    rules={{ required: true, minLength: 4, maxLength: 4 }}
                    render={({ field: { onChange, value } }) => (
                        <PinInput onFillEnded={(otp) => onChange(otp)} autoFocus ref={ref} />
                    )}
                />
            </View>
			
			{errors.pin && <Text className="text-red-500">PIN must be 4 digits.</Text>}

			{isConfirmationRequired && (
				<View className='mt-5'>
                    <Text className="text-md font-normal mb-4">Confirm PIN</Text>
					<Controller
						name="confirmPin"
						control={control}
						rules={{
							validate: (value) => value === pin || "PINs do not match",
						}}
						render={({ field: { onChange, value } }) => (
							<PinInput onFillEnded={(otp) => onChange(otp)} autoFocus ref={ref} />
						)}
					/>
					{errors.confirmPin && <Text className="text-red-500">{errors.confirmPin.message}</Text>}
				</View>
			)}
            <View className='mt-5'>
                <Button className="" onPress={handleSubmit(handlePinSubmit)}>
                    {isConfirmationRequired ? "Set PIN" : "Login"}
                </Button>
            </View>
			
		</View>
        </SafeAreaView>
		
	);
}

export default TwoFactorAuth;

const styles = StyleSheet.create({});
