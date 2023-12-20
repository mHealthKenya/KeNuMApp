import React, { FC } from 'react';
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Button, Icon, List } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

interface Content {
	title: string;
	items: string[];
}

interface Join {
	title: string;
	description: string;
	icon: string;
}

const trainingItems = [
	'Annual scientific conferences',
	'Online CPDs in collaboration with NCK',
	'Regional Conferences such as ecason',
];

const programs = [
	'Muugizi cover with britam insurance company caters for; 1. indemnity incase of litigation 2. Benevolence when a member passes away',
];

const handleRedirect = () => {
	const url = 'https://www.kpna.or.ke/register/';
	WebBrowser.openBrowserAsync(url);
};

const ContentBox: FC<{ content: Content }> = ({ content }) => {
	const { width } = useWindowDimensions();
	return (
		<View className='p-2'>
			<View
				style={{
					height: 'auto',
				}}>
				<View
					style={{
						height: 'auto',
						backgroundColor: '#003d4c',
					}}
					className='justify-center items-center'>
					<Text
						className='uppercase font-bold tracking-wide text-base my-4'
						style={{
							color: '#fff',
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
									<Text
										className='uppercase font-semibold tracking-wide text-sm p-2'
										numberOfLines={5}>
										{item}
									</Text>
								</View>
							}
						/>
					))}
				</View>
				<View
					style={{
						height: 'auto',
						backgroundColor: '#f2f5f6',
					}}>
					<View className='my-8 p-2 justify-center items-center'>
						<Button
							onPress={handleRedirect}
							mode='outlined'
							style={[styles.button, { width: width * 0.5 }]}
							textColor='#000000'>
							Register
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

const JoinBox: FC<{ join: Join }> = ({ join }) => {
	const { width } = useWindowDimensions();
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
					<Text className='uppercase tracking-widest text-slate-100 text-base'>
						{join.title}
					</Text>
				</View>
				<View
					style={{
						width: width * 0.7,
						height: 'auto',
					}}>
					<Text
						className='tracking-widest text-slate-100 text-sm'
						numberOfLines={6}>
						{join.description}
					</Text>
				</View>
			</View>
		</View>
	);
};

const KPNAComponent = () => {
	const { height, width } = useWindowDimensions();
	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={require('../../assets/images/kpnaback.png')}
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
							<Text className='text-center font-bold text-5xl tracking widest uppercase'>
								Who We Are
							</Text>
							<Text className='text-center font-semibold text-lg tracking widest uppercase'>
								Kenya Progressive Nurses Association
							</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-base'>
									KPNA is the national and global professional voice of Kenyan
									nursing, representing over 135,000 nurses in all 47 counties
									across
								</Text>
							</View>
						</View>
					</View>
					<View className='mt-10'>
						<View className='flex flex-col'>
							<Text className='text-center font-bold text-5xl tracking widest uppercase'>
								Membership
							</Text>
							<Text className='text-center font-semibold text-lg tracking widest uppercase'>
								A variety of value added services
							</Text>
						</View>
						<View className='p-2 flex flex-col'>
							<View>
								<Text className='tracking-wide text-base'>
									KPNA is the national voice of Kenyan nursing, working with
									nurses in all the 47 counties across Kenya with an aim to
									introduce essential and meaningful change to health care and
									nursing in the country. We bring you the latest knowledge,
									help you achieve your career goals and offer you preferred
									rates with various businesses and service providers.
								</Text>
							</View>
						</View>
					</View>
					<View className='mt-10'>
						<View className='flex flex-col my-5'>
							<Text className='text-center font-bold text-xl tracking widest uppercase'>
								How you benefit as a member
							</Text>
						</View>
						<ContentBox
							content={{
								title: 'Trainings',
								items: trainingItems,
							}}
						/>

						<ContentBox
							content={{
								title: 'Research Opportunities',
								items: ['Networking opportunities to top research institutes'],
							}}
						/>

						<ContentBox
							content={{
								title: 'Recognition awards',
								items: ['Get recognition for your work'],
							}}
						/>
						<ContentBox
							content={{
								title: 'Social welfare programs',
								items: programs,
							}}
						/>
					</View>

					<View className='p-2'>
						<View
							style={{
								backgroundColor: '#003d4c',
								height: 'auto',
							}}>
							<View>
								<Text
									className='text-center  text-3xl tracking widest my-2'
									style={{
										color: '#fff',
									}}>
									Why join KPNA?
								</Text>
							</View>

							<View>
								<JoinBox
									join={{
										title: 'your practice',
										description:
											'KPNA works to improve health care in Kenya and is committed to maintaining a publicly funded,not-for-profit health system for all Kenyans by influencing public policy.',
										icon: 'chess-knight',
									}}
								/>
								<JoinBox
									join={{
										title: 'your issues',
										description:
											'Because your priorities are our priorities, we continuously advocate for the vital role nurses play in our health-care system.',
										icon: 'puzzle-star-outline',
									}}
								/>

								<JoinBox
									join={{
										title: 'your voice',
										description:
											'KPNA works to ensure that nurses’ expertise, guidance and concerns are top of mind with government leaders and key decision-makers across Kenya.',
										icon: 'ship-wheel',
									}}
								/>

								<JoinBox
									join={{
										title: 'networking',
										description:
											'Add Networking with like minded partners for professional growth',
										icon: 'seal-variant',
									}}
								/>

								<JoinBox
									join={{
										title: 'benchmarking',
										description:
											'Benchmarking for best Nursing practices locally, Regionally and Internationally.',
										icon: 'web',
									}}
								/>

								<View className='my-8 items-end p-2'>
									<Button
										onPress={handleRedirect}
										mode='outlined'
										className='mb-3'
										textColor='#fff'
										style={styles.memberButton}>
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

export default KPNAComponent;

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
