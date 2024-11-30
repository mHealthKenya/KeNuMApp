import * as WebBrowser from 'expo-web-browser';
import React, {FC} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Button, Icon} from 'react-native-paper';
import {Text} from '../Themed';

interface Content {
	title: string;
	items: string;
}

interface Join {
	title: string;
	description: string;
	icon: string;
}

const handleRedirect = () => {
	const url = 'https://www.kenyamidwives.org/membership';
	WebBrowser.openBrowserAsync(url);
};

const ContentBox: FC<{content: Content}> = ({content}) => {
	return (
		<View className='p-2'>
			<View
				style={{
					height: 'auto',
				}}>
				<View
					style={{
						height: 'auto',
						backgroundColor: '#fff',
					}}
					className='justify-center items-center'>
					<Text
						className='uppercase font-bold tracking-wide text-lg my-4'
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
					}}
					className='justify-center items-center p-3 rounded'>
					<Text
						className='font-normal tracking-wide text-lg my-4'
						style={{
							color: '#000',
						}}>
						{content.items}
					</Text>
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
					<Text className='uppercase tracking-widest text-slate-100 text-lg'>{join.title}</Text>
				</View>
				<View
					style={{
						width: width * 0.7,
						height: 'auto',
					}}>
					<Text className='tracking-widest text-slate-100 text-lg' numberOfLines={6}>
						{join.description}
					</Text>
				</View>
			</View>
		</View>
	);
};

const MAKComponent = () => {
	const {height, width} = useWindowDimensions();
	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={require('../../assets/images/midwives_team.jpg')}
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
								Midwives Association of Kenya
							</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-lg'>
									MAK, founded in 2016, is a non-profit representing Kenyan midwives. Registered under the Societies Act (No.
									48354), MAK is committed to advancing and revitalizing the midwifery profession in Kenya. As a member of ICM,
									ECSACON, and KHPS, MAK collaborates globally and regionally to enhance midwifery standards.
								</Text>
							</View>
						</View>
					</View>
					<View className='mt-10'>
						<View className='flex flex-col'>
							<Text className='text-center font-bold text-5xl tracking widest uppercase'>Join us</Text>
							<Text className='text-center font-semibold text-lg tracking widest uppercase'>Some of our membership types</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-lg'>
									Welcome to our exclusive membership! Enjoy priority event access, special discounts, and personalized
									recommendations. Connect with like-minded individuals, expand your network, and access a plethora of benefits
									designed to enhance your experience with us. Welcome to a world of possibilities!
								</Text>
							</View>
						</View>
					</View>

					<View className='mt-10'>
						<View className='flex flex-col my-5'>
							<Text className='text-center font-bold text-xl tracking widest uppercase'>Joining and Subscription Fees</Text>
						</View>

						<ContentBox
							content={{
								title: 'Ordinary, Associate, Honarary and Life Members',
								items:
									'Registration Fee: KES 1,000/- paid to the MAK National Office New Members Only Monthly Subscription KES 300/- will be payable to Equity Bank Ltd. account pay bill number obtained from your County/ Branch Office. Note: Where there is no branch the payments are made to the National Office pending registration of a Branch a may be applicable',
							}}
						/>

						<ContentBox
							content={{
								title: 'Students and Customers',
								items:
									'Discounted rates: Students and Customers pay 50% of the normal fee. Registration Fee: KES 500/- paid to the MAK National Office (New Members Only) Monthly Subscription KES 150/- will be payable to Equity Bank Ltd. account pay bill number. Note: Customer is a Community Member who advocates for midfery care.',
							}}
						/>
						<ContentBox
							content={{
								title: 'Payment Channels (MAK National Office)',
								items:
									'Bank: Equity Bank Kenya Limited Branch: Upper Hill Branch BANK MPEAS Pay Bill Number: 247247 Account Pay Bill Number: 858951 Note: Once you make the payment, please send the details to admin@kenyamidwives.org',
							}}
						/>
					</View>

					<View className='p-2'>
						<View
							style={{
								backgroundColor: '#069C54',
								height: 'auto',
							}}>
							<View>
								<Text
									className='text-center  text-3xl tracking widest my-2'
									style={{
										color: '#fff',
									}}>
									Types of Membership
								</Text>
							</View>

							<View>
								<JoinBox
									join={{
										title: 'Ordinary Member',
										description:
											'Our Ordinary Membership is designed for being any person holding a midwifery professional regardless of the area of practice.',
										icon: 'account',
									}}
								/>
								<JoinBox
									join={{
										title: 'Associate Member',
										description:
											'The Associate Membership is ideal for being any person with a special interest in Reproductive/maternal and child health care supporting midwives.',
										icon: 'puzzle-star-outline',
									}}
								/>

								<JoinBox
									join={{
										title: 'Student Member',
										description:
											'Our Student Membership caters specificallybeing persons undergoing a midwifery course at any level of training.',
										icon: 'ship-wheel',
									}}
								/>

								<JoinBox
									join={{
										title: 'Customer Member',
										description:
											'The Customer Membership is designed for individuals being a non-midwifery professional interested in supporting the midwifery profession in any positive way.',
										icon: 'seal-variant',
									}}
								/>

								<JoinBox
									join={{
										title: 'Honorary Member',
										description:
											'Our Honorary Membership is for the midwives to award membership to any person who has rendered significant services to midwifery or one who consistently and significantly promotes the objectives of The Association.',
										icon: 'web',
									}}
								/>

								<JoinBox
									join={{
										title: 'Life Member',
										description:
											'The Life Membership offers a lifelong commitment to being professional midwife willing and signs to support midwifery with a standard critical resource.',
										icon: 'web',
									}}
								/>

								<JoinBox
									join={{
										title: 'Funding Partner',
										description:
											"Our Funding Partnership is specifically designed for organizations and businesses that share our vision and want to actively support our mission. As a Funding Partner, you'll have the opportunity to collaborate on projects, gain visibility through co-branding opportunities, and contribute to positive change in our field.",
										icon: 'web',
									}}
								/>

								<View className='my-8 items-end p-2'>
									<Button onPress={handleRedirect} mode='outlined' className='mb-3' textColor='#fff' style={styles.memberButton}>
										{' '}
										BECOME A MEMBER
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

export default MAKComponent;

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
