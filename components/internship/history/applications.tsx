import dayjs from 'dayjs';
import React, { FC, useMemo, useState } from 'react';
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import { InternshipApplication } from '../../../models/internshipapplications';
import { useSearch } from '../../../providers/search';
import globalStyles from '../../../styles/global';
import ActionBottom from '../../shared/ActionBottom';

export const currencyFormatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
});

export const InternshipItem: FC<{
	title: string;
	content: string;
	availableWidth: number;
}> = ({ title, content, availableWidth }) => {
	return (
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
				<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
					</View>
					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View
					style={[
						{
							flex: 1,
							padding: 10,
						},
					]}>
					<Text style={styles.normalText}>{content}</Text>
				</View>
			</View>
		</View>
	);
};

export const InternshipItemDouble: FC<{
	title: string;
	subtitle: string;
	subtitle1: string;
	content: string;
	content1: string;
	availableWidth: number;
}> = ({ title, content, availableWidth, subtitle, subtitle1, content1 }) => {
	return (
		<View>
			<View
				style={[
					globalStyles.row,
					{
						justifyContent: 'space-between',
						padding: 10,
					},
				]}>
				<View
					style={[
						globalStyles.row,
						{
							width: availableWidth * 0.25,
							justifyContent: 'space-between',
							padding: 10,
						},
					]}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[styles.itemText, styles.titleText]}>{title}</Text>
					</View>

					<Divider
						style={{
							width: 1,
							height: '100%',
						}}
					/>
				</View>
				<View
					style={[
						globalStyles.row,
						{
							flex: 1,
							padding: 10,
							justifyContent: 'space-between',
						},
					]}>
					<View style={[globalStyles.column, { width: availableWidth * 0.35 }]}>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.mutedText}>{subtitle}</Text>
						</View>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.normalText}>{content}</Text>
						</View>
					</View>

					<View style={[globalStyles.column, { width: availableWidth * 0.35 }]}>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.mutedText}>{subtitle1}</Text>
						</View>
						<View style={{ paddingVertical: 3 }}>
							<Text style={styles.normalText}>{content1}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const Application: FC<{
	application: InternshipApplication;
	action: (item: InternshipApplication) => void;
}> = ({ application, action }) => {
	const { height, width } = useWindowDimensions();

	const dimension = Math.min(width, height);

	const availableWidth = dimension - 20;
	return (
		<Pressable style={[styles.card]} onPress={() => action(application)}>
			<View style={[globalStyles.column]}>
				<InternshipItem
					availableWidth={availableWidth}
					title='Center'
					content={application.internship_center}
				/>
				<InternshipItem
					availableWidth={availableWidth}
					title='Cadre'
					content={application.cadre_desc}
				/>
				<InternshipItemDouble
					title='Date'
					subtitle='Start Date'
					content={dayjs(new Date(application.start_date)).format('DD/MM/YYYY')}
					subtitle1='Application Date'
					content1={dayjs(new Date(application.application_date)).format(
						'DD/MM/YYYY'
					)}
					availableWidth={availableWidth}
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

const InternshipApplicationsComponent: FC<{
	applications: InternshipApplication[];
	refresh: () => void;
	isRefreshing: boolean;
}> = ({ applications, refresh, isRefreshing }) => {
	const { search, handleSearch } = useSearch();

	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow(!show);
	};

	const [item, setItem] = useState<InternshipApplication | null>(null);

	const handleItem = (item: InternshipApplication) => {
		setItem(item);
		setShow(!show);
	};

	const filtered = useMemo(
		() =>
			applications.filter((item) =>
				item.internship_center.toLowerCase().includes(search.toLowerCase())
			),
		[applications, search]
	);

	return (
		<View style={[globalStyles.container]}>
			<ActionBottom
				action={{
					show,
					toggleShow,
					item,
				}}
			/>
			<Searchbar
				placeholder='Search by internship center'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlatList
				data={filtered}
				renderItem={({ item }) => (
					<Application application={item} action={() => handleItem(item)} />
				)}
				keyExtractor={(item) => item.internship_id}
				showsVerticalScrollIndicator={false}
				onRefresh={() => refresh()}
				refreshing={isRefreshing}
			/>
		</View>
	);
};

export default InternshipApplicationsComponent;

const styles = StyleSheet.create({
	box: {
		padding: 20,
		margin: 4,
	},

	card: {
		// backgroundColor: '#dcf0fa',
		backgroundColor: '#FFFF',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#b1c4e5',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6,
		elevation: 14,
		margin: 10,
	},

	itemText: {
		textAlign: 'left',
	},

	titleText: {
		fontSize: 14,
		color: '#356bc4',
		letterSpacing: 2,
	},

	normalText: {
		letterSpacing: 1.5,
		textTransform: 'capitalize',
		fontSize: 16,
	},

	mutedText: {
		color: '#b6b6b6',
		fontSize: 14,
	},

	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
