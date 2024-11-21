import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as Print from 'expo-print';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { licenceGenerator } from '../../../helpers/licencegenerator';
import { useAuth } from '../../../providers/auth';

const HomeLicenceComponent: FC<{ width: number; height: number }> = ({ width, height }) => {
  const { user } = useAuth();

  const endDate = user?.license?.length
    ? dayjs(new Date(user?.license[0].to_date || ''))
    : dayjs(new Date());

  const currentDate = dayjs(new Date());

  const diff = Math.ceil(endDate.diff(currentDate) / 86400000);

  const usableWidth = width - 4;

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
        height: 'auto',
        backgroundColor: '#dfefd8',
      }}
      className="m-2 rounded-xl justify-between shadow-md">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          source={require('../../../assets/images/validlicence.png')}
          style={{
            height: height * 0.04,
            width: usableWidth * 0.08,
          }}
          className="mr-4"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginLeft: 10
          }}>
          <Text
            style={{
              color: '#3b763d',
            }}
            className="font-bold tracking-widest text-lg">
            Well Done!
          </Text>
          <Text
            style={{
              color: '#3b763d',
            }}
            className="tracking-widest">
            Your licence is active. Your practicing licence will expire in{' '}
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
      <Divider />
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#3b763d',
          }}
          className="font-bold tracking-wide">
          Status: Active
        </Text>
        <Text
          style={{
            color: '#3b763d',
          }}
          className="font-bold tracking-wide">
          Days Remaining: {diff}
        </Text>
      </View>
    </View>
  );
};

export default HomeLicenceComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#339934',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
