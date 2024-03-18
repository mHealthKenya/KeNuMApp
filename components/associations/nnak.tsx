import {FlashList} from '@shopify/flash-list';
import * as WebBrowser from 'expo-web-browser';
import React, {FC} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Button, Icon, List} from 'react-native-paper';

interface Content {
	title: string;
	items: string[];
	images?: string[];
}

interface Join {
	title: string;
	description: string;
	icon: string;
}

const nnakacademy = [
	'Advanced wound care traininng',
	'Basic life support trainning',
	'Advanced cardiac life support training',
	'IELTS',
];

const chapters = [
	'1. Ophthalic Chapter',
	'2. Critical Care Nurses Chapter',
	'3. Midwives Chapter',
	'4. Mental Health Chapter',
	'5. Community Health Chapter',
	'6. Peri-operative Nurses Chapter',
	'7. Disaster and Emergency Chapter',
	'8. Pediatric Nurses Chapter',
	'9. Registered Nurse Anaesthetists Chapter',
	'10. Eastern Central Southern African College of Nursing(ECSACON)',
	'11. Infection Control Nurses Chapter',
	'12. Leadership for Change (LFC) Chapter',
	'13. Private Nurse Practitioners Chapter',
	'14. Student Nurses Chapter',
	'15. HIV/AIDS Chapter',
];
const imageList = [
	require('../../assets/images/britam.png'),
	require('../../assets/images/amref.png'),
	require('../../assets/images/chiromo.png'),
	require('../../assets/images/kenvue.png'),
	require('../../assets/images/dkt.png'),
	require('../../assets/images/helb.png'),
	require('../../assets/images/tridem.jpeg'),
	require('../../assets/images/usaid.png'),
	require('../../assets/images/viya.png'),
	require('../../assets/images/emergencymedicinekenya.png'),
	require('../../assets/images/Planned-Parenthood-global-logo.png'),
];

const handleRedirect = () => {
	const url = 'https://www.nnak.or.ke/';
	WebBrowser.openBrowserAsync(url);
};

const ContentBox: FC<{content: Content}> = ({content}) => {
	const {width} = useWindowDimensions();
	return (
		<View className='p-2'>
			<View
				style={{
					height: 'auto',
				}}>
				<View
					style={{
						height: 'auto',
						backgroundColor: '#00ff00',
					}}
					className='justify-center items-center'>
					<Text
						className='uppercase font-bold tracking-wide text-base my-4'
						style={{
							color: '#000',
						}}>
						{content.title}
					</Text>
				</View>
				<View
					style={{
						height: 'auto',
						backgroundColor: '#fff',
					}}>
					{content.items.map((item, index) => (
						<List.Item
							key={index}
							title={
								<View className='flex'>
									<Text className='uppercase font-semibold tracking-wide text-sm p-2' numberOfLines={5}>
										{item}
									</Text>
								</View>
							}
						/>
					))}
				</View>

				{content.images && (
					<View style={{flex: 1, height: 100, marginVertical: 10}}>
						<FlashList
							horizontal
							data={imageList}
							keyExtractor={(item, index) => index.toString()}
							estimatedItemSize={150}
							renderItem={({item}) => <Image source={item} style={{width: 200, height: 100, marginRight: 10}} />}
						/>
					</View>
				)}

				<View
					style={{
						height: 'auto',
						backgroundColor: '#f2f5f6',
					}}>
					<View className='my-8 p-2 justify-center items-center'>
						<Button
							onPress={handleRedirect}
							mode='outlined'
							style={[styles.button, {width: width * 0.5}]}
							textColor='#000000'>
							Register
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

const JoinBox: FC<{join: Join}> = ({join}) => {
	const {width} = useWindowDimensions();
	return (
		<View className='p-3  flex flex-row gap-5'>
			<View>
				<Icon source={join.icon} size={40} color='#fff' />
			</View>
			<View className='flex flex-col'>
				<View
					className='mb-2'
					style={{
						height: 'auto',
					}}>
					<Text className='uppercase tracking-widest text-slate-100 text-base'>{join.title}</Text>
				</View>
				<View
					style={{
						width: width * 0.7,
						height: 'auto',
					}}>
					<Text className='tracking-widest text-slate-100 text-sm' numberOfLines={6}>
						{join.description}
					</Text>
				</View>
			</View>
		</View>
	);
};

const NNAKComponent = () => {
	const {height, width} = useWindowDimensions();
	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={require('../../assets/images/nnakback.jpeg')}
				style={styles.image}
				imageStyle={{
					opacity: 0.3,
				}}
				resizeMode='cover'>
				<ScrollView
					style={{
						flex: 1,
					}}>
					<View className='mt-10'>
						<View className='flex flex-col'>
							<Text className='text-center font-bold text-5xl tracking widest uppercase'>Who We Are</Text>
							<Text className='text-center font-semibold text-lg tracking widest uppercase'>
								National Nurses Association of Kenya
							</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-base'>
									The National Nurses Association of Kenya (NNA-Kenya) is a professional association representing all cadres of
									nurses in Kenya who are drawn from practice settings, education, and research institutions. Established in
									1968, we are duly registered under Cap 108 of the laws of Kenya. We have branches in all 47 counties across the
									country. We exist to promote excellence in nursing and midwifery.
								</Text>
							</View>
						</View>
					</View>
					<View className='mt-10'>
						<View className='flex flex-col'>
							<Text className='text-center font-bold text-5xl tracking widest uppercase'>Membership</Text>
							<Text className='text-center font-bold text-xl tracking widest uppercase'>Want to become a member</Text>
							<Text className='text-center font-semibold text-lg tracking widest uppercase'>Follow these steps</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-base'>
									1. Download the relevant Registration form (Available on NNAK website)
								</Text>
								<Text className='tracking-wide text-base'>2. Fill it out (Remember to sign it)</Text>
								<Text className='tracking-wide text-base'>3. Scan the Registration form</Text>

								<Text className='tracking-wide text-base'>
									4. Pay the registration fee to MPesa Paybill: 653080. The account number is your ID Number
								</Text>
								<Text className='tracking-wide text-base'>5. Upload the form below</Text>
								<Text className='tracking-wide text-base'>6. Enter the MPesa Transaction code and send</Text>
								<Text className='tracking-wide text-base'>7. Done</Text>
							</View>
						</View>
					</View>
					<View className='mt-10'>
						<View className='flex flex-col my-5'>
							<Text className='text-center font-bold text-xl tracking widest uppercase'>How you benefit as a member</Text>
						</View>
						<ContentBox
							content={{
								title: 'NNAK Academy',
								items: nnakacademy,
							}}
						/>

						<ContentBox
							content={{
								title: 'Our Partners',
								items: ['We work with the best partners.'],
								images: imageList,
								// images: [
								//   "britam.png",
								//   // "amref.png",
								//   // "chiromo.png",
								//   // "kenvue.png",
								// ],
							}}
						/>

						<ContentBox
							content={{
								title: 'Chapters',
								items: chapters,
							}}
						/>
					</View>

					<View className='p-2'>
						<View
							style={{
								backgroundColor: '#808080',
								height: 'auto',
							}}>
							<View>
								<Text
									className='text-center  text-3xl tracking widest my-2'
									style={{
										color: '#fff',
									}}>
									Why us?
								</Text>
							</View>

							<View>
								<JoinBox
									join={{
										title: 'Advancing Modern Nursing practices through research',
										description:
											'The Association partners with various research organizations to conduct clinical research with the aim of generating evidence-based Nursing Practices. We have sponsored annual Scientific Conferences for members with abstracts to present, share and exchange knowledge from research and build upon the gaps identified.',
										icon: 'feature-search-outline',
									}}
								/>
								<JoinBox
									join={{
										title: 'Nurse Welfare programs',
										description:
											'We have a system to support members through a social welfare program We Initiate Evidence-based projects to address community needs including Girl Child Education Fund (GCEF) for deceased members.',
										icon: 'puzzle-star-outline',
									}}
								/>

								<JoinBox
									join={{
										title: 'Career Growth',
										description:
											'Accredited Continuing Professional Development (CPD) training for both online and on site with accredited CPD Points for license renewal, career opportunities and personal growth and Development. Free CPD materials such as booklets. Sponsored Exchange programs.Education pool fund for members. Members are also able to receive CPD points and certification after attendance of our Annual Scientific Conference.',
										icon: 'seal-variant',
									}}
								/>

								<View className='my-8 items-end p-2'>
									<Button onPress={handleRedirect} mode='outlined' className='mb-3' textColor='#fff' style={styles.memberButton}>
										{' '}
										JOIN NNAK
									</Button>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default NNAKComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	image: {
		flex: 1,
	},

	button: {
		borderRadius: 2,
		borderColor: '#000000',
	},

	memberButton: {
		borderRadius: 2,
		borderColor: '#fff',
	},
});
