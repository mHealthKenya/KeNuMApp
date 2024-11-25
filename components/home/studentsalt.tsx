import React from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import Associations from './associations';
import NursesAltComponent from './nursesalt';

const StudentsHome = () => {
	const {height, width} = useWindowDimensions();

	return (
		<View className='flex flex-1'>
			<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
				<NursesAltComponent
					item={{
						width,
						height,
						title: "Student's Module",
						actionTitle: 'View All',
						more: '/studentshome',
						items: [
							{
								title: 'Internships',
								source: require('../../assets/images/internshipalt.png'),
								href: '/internship',
							},

							{
								title: 'Exams',
								source: require('../../assets/images/examalt.png'),
								href: '/examall',
							},
                            
						],
					}}
				/>

				<Associations
					item={{
						width,
						height,
					}}
				/>

				<NursesAltComponent
					item={{
						width,
						height,
						title: 'General',
						items: [
							{
								title: 'Knowledge Base',
								source: require('../../assets/images/knowledgealt.png'),
								href: '/allknowledge',
							},

							{
								title: 'FAQs',
								source: require('../../assets/images/faqalt.png'),
								href: '/allfaqs',
							},
						],
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default StudentsHome;
