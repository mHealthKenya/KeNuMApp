import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { currencyFormatter } from '../../helpers/currency-formatter';
import { ExamApplication } from '../../models/examapplications';
import globalStyles from '../../styles/global';
import {
	InternshipItem,
	InternshipItemDouble,
} from '../internship/history/applications';
import ActionBottomExam from './actionbottomexam';

const Application: FC<{
	application: ExamApplication;
	action: (application: ExamApplication) => void;
}> = ({ application, action }) => {
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable style={[styles.card]} onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem
					availableWidth={availableWidth}
					title='Exam Series'
					content={application.exams_series}
				/>
				<InternshipItem
					availableWidth={availableWidth}
					title='Cadre'
					content={application.cadre}
				/>

				<InternshipItem
					availableWidth={availableWidth}
					title='Date'
					content={dayjs(new Date(application.application_date)).format(
						'DD/MM/YYYY'
					)}
				/>

				<InternshipItemDouble
					title='Invoice'
					subtitle='Invoice Number'
					content={application.invoice_no}
					subtitle1='Amount'
					content1={currencyFormatter.format(+application.amount_due)}
					availableWidth={availableWidth}
				/>

				<InternshipItemDouble
					title='Amount'
					subtitle='Amount Paid'
					content={currencyFormatter.format(+application.amount_paid)}
					subtitle1='Balance Due'
					content1={currencyFormatter.format(+application.balance_due)}
					availableWidth={availableWidth}
				/>
			</View>
		</Pressable>
	);
};

const ExamApplicationsComponent: FC<{
	applications: ExamApplication[];
}> = ({ applications }) => {
	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow(!show);
	};

	const [item, setItem] = useState<ExamApplication | null>(null);

	const handleItem = (item: ExamApplication) => {
		setItem(item);
		setShow(!show);
	};
	return (
		<View style={globalStyles.container}>
			<ActionBottomExam
				action={{
					show,
					toggleShow,
					item,
				}}
			/>
			<FlatList
				data={applications}
				renderItem={({ item }) => (
					<Application application={item} action={() => handleItem(item)} />
				)}
			/>
		</View>
	);
};

export default ExamApplicationsComponent;

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#dcf0fa',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	mutedText: {
		color: '#4e4e4e',
		fontSize: 14,
		letterSpacing: 1.5,
		textTransform: 'capitalize',
	},

	titleText: {
		color: '#3f51b5',
		fontSize: 16,
		letterSpacing: 2,
		textTransform: 'capitalize',
	},
});
