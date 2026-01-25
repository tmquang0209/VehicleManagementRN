import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const MOCK_VEHICLES = [
	{
		id: '1',
		plate: '59-L1 123.45',
		description: 'Honda Vision - Màu Trắng',
		type: 'motorbike',
	},
	{
		id: '2',
		plate: '51-F 678.90',
		description: 'Toyota Vios - Màu Đen',
		type: 'car',
	},
];

export default function RoomDetailsScreen() {
	const router = useRouter();
	const theme = useColorScheme() ?? 'light';
	const params = useLocalSearchParams<{ id: string; representative: string; status: string }>();

	return (
		<ThemedSafeAreaView style={styles.container}>
			{/* Specific Header with center title */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
					<ThemedIcon name="arrow-left" size={24} color="black" />
				</TouchableOpacity>
				<ThemedText type="subtitle" style={styles.headerTitle}>
					CHI TIẾT PHÒNG
				</ThemedText>
				<View style={styles.placeholderButton} />
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				{/* Profile Section */}
				<View style={styles.profileSection}>
					<View style={styles.avatarContainer}>
						{/* Placeholder Avatar */}
						<View style={styles.avatar}>
							<ThemedIcon name="account" size={60} color="gray" />
						</View>
						<View style={styles.onlineIndicator} />
					</View>

					<ThemedText type="subtitle" style={styles.name}>
						{params.representative || 'Chưa có người ở'}
					</ThemedText>

					<View style={styles.roomBadge}>
						<ThemedText type="defaultSemiBold" style={styles.roomBadgeText}>
							Phòng {params.id}
						</ThemedText>
					</View>

					<ThemedText type="default" style={styles.phone}>
						090 123 4567
					</ThemedText>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionRow}>
					<TouchableOpacity style={[styles.actionButton, styles.callButton]}>
						<ThemedIcon name="phone" size={24} color="white" />
						<ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
							GỌI ĐIỆN
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
						<ThemedIcon name="message-text" size={24} color="white" />
						<ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
							NHẮN TIN
						</ThemedText>
					</TouchableOpacity>
				</View>

				{/* Vehicle List Section */}
				<View style={styles.sectionHeader}>
					<View style={styles.verticalBar} />
					<ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
						DANH SÁCH XE
					</ThemedText>
				</View>

				<View style={styles.vehicleList}>
					{MOCK_VEHICLES.map((vehicle) => (
						<ThemedView key={vehicle.id} style={styles.vehicleCard} lightColor="#fff" darkColor="#151718">
							<View style={styles.vehicleIconContainer}>
								<ThemedIcon name={vehicle.type === 'car' ? 'car' : 'motorbike'} size={24} color={theme === 'dark' ? 'white' : 'gray'} />
							</View>
							<View style={styles.vehicleInfo}>
								<ThemedText type="defaultSemiBold" style={styles.plateNumber} lightColor="#0056D2" darkColor="#409CFF">
									{vehicle.plate}
								</ThemedText>
								<ThemedText type="small" style={styles.vehicleDesc}>
									{vehicle.description}
								</ThemedText>
							</View>
							<View style={styles.statusIndicator} />
						</ThemedView>
					))}
				</View>
			</ScrollView>

			{/* Footer Actions */}
			<View style={styles.footer}>
				<TouchableOpacity style={styles.editButton}>
					<ThemedIcon name="pencil" size={20} color="black" />
					<ThemedText type="defaultSemiBold" style={styles.footerButtonText}>
						CHỈNH SỬA THÔNG TIN
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity style={styles.deleteButton}>
					<ThemedIcon name="trash-can-outline" size={20} color="red" />
					<ThemedText type="defaultSemiBold" style={styles.deleteButtonText}>
						XÓA PHÒNG KHỎI HỆ THỐNG
					</ThemedText>
				</TouchableOpacity>
			</View>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		// No border bottom
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: '#0056D2',
	},
	placeholderButton: {
		width: 32,
	},
	content: {
		paddingBottom: 100,
	},
	profileSection: {
		alignItems: 'center',
		paddingVertical: 24,
	},
	avatarContainer: {
		position: 'relative',
		marginBottom: 16,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#E1E1E1',
		alignItems: 'center',
		justifyContent: 'center',
	},
	onlineIndicator: {
		position: 'absolute',
		bottom: 4,
		right: 4,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#28a745',
		borderWidth: 3,
		borderColor: 'white',
	},
	name: {
		marginBottom: 8,
		textAlign: 'center',
	},
	roomBadge: {
		backgroundColor: '#E6F0FF',
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 20,
		marginBottom: 8,
	},
	roomBadgeText: {
		fontSize: 14,
		color: '#0056D2',
		fontWeight: '600',
	},
	phone: {
		color: '#666',
		fontSize: 16,
	},
	actionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		gap: 16,
		marginBottom: 32,
	},
	actionButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		borderRadius: 12,
		gap: 8,
	},
	callButton: {
		backgroundColor: '#0056D2',
	},
	messageButton: {
		backgroundColor: '#11181C',
	},
	actionButtonText: {
		color: 'white',
		fontSize: 14,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	verticalBar: {
		width: 4,
		height: 24,
		backgroundColor: '#0056D2',
		marginRight: 8,
		borderRadius: 2,
	},
	sectionTitle: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: '#0056D2',
	},
	vehicleList: {
		paddingHorizontal: 16,
	},
	vehicleCard: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	vehicleIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 12,
		backgroundColor: '#F5F7FA', // Subtle background for icon
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	vehicleInfo: {
		flex: 1,
	},
	plateNumber: {
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 4,
	},
	vehicleDesc: {
		color: '#666',
	},
	statusIndicator: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#28a745',
	},
	footer: {
		padding: 16,
		paddingBottom: 32,
		gap: 12,
		backgroundColor: 'transparent',
	},
	editButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		borderRadius: 12,
		backgroundColor: '#E8E8E8',
		gap: 8,
	},
	deleteButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		borderRadius: 12,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#E02424', // Red border
		gap: 8,
	},
	footerButtonText: {
		color: '#333',
	},
	deleteButtonText: {
		color: '#E02424',
	},
});
