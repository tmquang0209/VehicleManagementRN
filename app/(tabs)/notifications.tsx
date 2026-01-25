import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const MOCK_NOTIFICATIONS = [
	{
		id: '1',
		title: 'Xe ra vào',
		message: 'Xe 59-L1 123.45 đã vào nhà',
		time: '10:30',
		read: false,
	},
	{
		id: '2',
		title: 'Thanh toán',
		message: 'Hóa đơn tiền điện tháng 10 đã được tạo',
		time: '09:15',
		read: true,
	},
	{
		id: '3',
		title: 'Hệ thống',
		message: 'Bảo trì hệ thống vào lúc 22:00 hôm nay',
		time: 'Hôm qua',
		read: true,
	},
];

export default function NotificationsScreen() {
	const theme = useColorScheme() ?? 'light';

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			{/* Header */}
			<Header
				title="THÔNG BÁO"
				icon="bell"
				rightComponent={
					<View style={styles.headerRight}>
						<ThemedIcon name="dots-horizontal" size={24} color="gray" />
					</View>
				}
			/>

			<ThemedScrollView contentContainerStyle={styles.content}>
				{MOCK_NOTIFICATIONS.map((item) => (
					<View key={item.id} style={[styles.notificationCard, { backgroundColor: theme === 'dark' ? '#151718' : '#fff' }, !item.read && { borderLeftWidth: 4, borderLeftColor: '#0056D2' }]}>
						<View style={[styles.iconCircle, { backgroundColor: item.read ? '#F5F7F9' : '#E6F0FF' }]}>
							<ThemedIcon name={item.read ? 'bell-outline' : 'bell-ring'} size={20} color={item.read ? 'gray' : 'primary'} />
						</View>
						<View style={styles.notificationContent}>
							<View style={styles.notificationHeader}>
								<ThemedText type="defaultSemiBold" style={styles.notificationTitle}>
									{item.title}
								</ThemedText>
								<ThemedText type="small" style={styles.timeText}>
									{item.time}
								</ThemedText>
							</View>
							<ThemedText type="default" style={styles.messageText} numberOfLines={2}>
								{item.message}
							</ThemedText>
						</View>
					</View>
				))}
			</ThemedScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerRight: {
		padding: 8,
	},
	content: {
		padding: 16,
	},
	notificationCard: {
		flexDirection: 'row',
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	iconCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	notificationContent: {
		flex: 1,
	},
	notificationHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	notificationTitle: {
		fontSize: 16,
	},
	timeText: {
		color: '#9BA1A6',
		fontSize: 12,
	},
	messageText: {
		color: '#687076',
		fontSize: 14,
		lineHeight: 20,
	},
});
