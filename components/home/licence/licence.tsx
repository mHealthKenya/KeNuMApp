import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as Print from 'expo-print';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { licenceGenerator } from '../../../helpers/licencegenerator';
import { useAuth } from '../../../providers/auth';

const HomeLicenceComponent: FC<{ width: number; height: number }> = ({ width, height }) => {
  const { user } = useAuth();

  const endDate = user?.license?.length
    ? dayjs(new Date(user?.license[0].to_date || ''))
    : dayjs(new Date());

  const currentDate = dayjs(new Date());
  const diff = Math.ceil(endDate.diff(currentDate) / 86400000);

  const usableWidth = width - 16;

  const printLicence = async () => {
    const html = await licenceGenerator(user);

    await Print.printAsync({
      html,
    }).catch(() => {
      return;
    });
  };

  return (
    <View
      style={{
        backgroundColor: '#dfefd8',
        padding: 8,
      }}
      className="m-2 rounded-lg shadow-sm">
      {/* Top Section */}
      <View className="flex-row items-center mb-2">
        <Image
          source={require('../../../assets/images/validlicence.png')}
          style={{
            height: height * 0.04,
            width: usableWidth * 0.08,
          }}
          className="mr-3"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: '#3b763d' }}
            className="font-bold text-md tracking-wide">
            Well Done!
          </Text>
          <Text
            style={{ color: '#3b763d', lineHeight: 20 }}
            className="text-sm">
            Your licence is active and will expire in{' '}
            <Text className="font-bold">{diff}</Text> days.
          </Text>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          icon="download"
          onPress={async () => await printLicence()}>
          Download
        </Button>
      </View>

      {/* Status Section */}
      <View className="flex-row justify-between items-center">
        <Text
          style={{ color: '#3b763d' }}
          className="font-medium text-sm">
          Status: <Text className="font-bold">Active</Text>
        </Text>
        <Text
          style={{ color: '#3b763d' }}
          className="font-medium text-sm">
          Days Left: <Text className="font-bold">{diff}</Text>
        </Text>
      </View>
    </View>
  );
};

export default HomeLicenceComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#339934',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
