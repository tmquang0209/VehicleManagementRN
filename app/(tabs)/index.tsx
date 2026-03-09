import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useHouseStore } from '@/store/house-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const MOCK_RECENT_ACTIVITY = [
	{ id: '1', plate: '59-L1 123.45', type: 'in', time: dayjs().subtract(5, 'minute').format('HH:mm'), room: '101' },
	{ id: '2', plate: '51-F 678.90', type: 'out', time: dayjs().subtract(15, 'minute').format('HH:mm'), room: '202' },
	{ id: '3', plate: '60-B1 098.76', type: 'in', time: dayjs().subtract(1, 'hour').format('HH:mm'), room: 'Khách' },
];

const MOCK_GUEST_VEHICLES = [
	{ id: '1', plate: '60-B1 098.76', description: 'Honda Wave - Đen', checkInTime: dayjs().subtract(1, 'hour').format('HH:mm'), visitRoom: '301' },
	{ id: '2', plate: '29-A1 555.55', description: 'Yamaha Sirius - Đỏ', checkInTime: dayjs().subtract(3, 'hour').format('HH:mm'), visitRoom: '105' },
];

export default function HomeScreen() {
	const theme = useColorScheme() ?? 'light';
	const activeColors = Colors[theme];

	const { houses, selectedHouseId } = useHouseStore();

	const selectedHouse = houses.find((h) => h.id === selectedHouseId) || houses[0];

	// Map data from store
	const stats = {
		totalHouses: houses.length,
		totalRooms: selectedHouse.totalRooms,
		occupiedRooms: selectedHouse.occupiedRooms,
		emptyRooms: selectedHouse.totalRooms - selectedHouse.occupiedRooms,
		totalVehicles: selectedHouse.totalVehicles,
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			{/* Header */}
			<Header title={`TỔNG QUAN: ${selectedHouse.name.toUpperCase()}`} icon="view-dashboard" />

			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				{/* Overview Stats Section */}
				<View style={styles.statsGrid}>
					{/* Houses Card */}
					<ThemedView style={styles.statCard} lightColor="#fff" darkColor="#151718">
						<View style={[styles.iconContainer, { backgroundColor: '#E6F0FF' }]}>
							<ThemedIcon name="home-city" size={24} color={Colors.primary} />
						</View>
						<ThemedText type="extraLarge" style={styles.statValue}>
							{stats.totalHouses}
						</ThemedText>
						<ThemedText type="small" style={styles.statLabel} lightColor="#687076" darkColor="#9BA1A6">
							Nhà trọ
						</ThemedText>
					</ThemedView>

					{/* Rooms Card */}
					<ThemedView style={styles.statCard} lightColor="#fff" darkColor="#151718">
						<View style={[styles.iconContainer, { backgroundColor: '#E6F7F5' }]}>
							<ThemedIcon name="door-open" size={24} color={Colors.primary} />
						</View>
						<View style={styles.roomStatsRow}>
							<ThemedText type="extraLarge" style={styles.statValue}>
								{stats.totalRooms}
							</ThemedText>
							<ThemedText type="small" style={[styles.statSubValue, { color: activeColors.success }]}>
								({stats.emptyRooms} trống)
							</ThemedText>
						</View>
						<ThemedText type="small" style={styles.statLabel} lightColor="#687076" darkColor="#9BA1A6">
							Phòng
						</ThemedText>
					</ThemedView>

					{/* Vehicles Card - Full Width */}
					<TouchableOpacity style={{ width: '100%' }} onPress={() => router.push('/vehicles')} activeOpacity={0.8}>
						<ThemedView style={[styles.statCard, styles.fullWidthCard]} lightColor="#fff" darkColor="#151718">
							<View style={styles.cardHeaderRow}>
								<View style={[styles.iconContainer, { backgroundColor: '#EAFFEA' }]}>
									<ThemedIcon name="bike" size={24} color={Colors.secondary} />
								</View>
								<View style={{ flex: 1, marginLeft: 12 }}>
									<ThemedText type="extraLarge" style={styles.statValue}>
										{stats.totalVehicles}
									</ThemedText>
									<ThemedText type="small" style={styles.statLabel} lightColor="#687076" darkColor="#9BA1A6">
										Tổng số xe đang quản lý
									</ThemedText>
								</View>
								<ThemedIcon name="chevron-right" size={24} color={Colors.light.icon} />
							</View>
						</ThemedView>
					</TouchableOpacity>
				</View>

				{/* Quick Actions Section */}
				<ThemedText type="subtitle" style={styles.sectionTitle} lightColor="#11181C" darkColor="#ECEDEE">
					Thao tác nhanh
				</ThemedText>

				<View style={styles.actionsGrid}>
					<TouchableOpacity style={[styles.actionButton, styles.buttonBlue]} onPress={() => router.push('/scan')}>
						<View style={styles.actionIconContainer}>
							<MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
						</View>
						<ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
							Quét xe
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.buttonDark]} onPress={() => router.push('/add-vehicle')}>
						<View style={styles.actionIconContainer}>
							<MaterialCommunityIcons name="bike-fast" size={32} color="#fff" />
						</View>
						<ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
							Thêm Xe
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.buttonLight]} onPress={() => router.push('/room-list')}>
						<View style={[styles.actionIconContainer, { backgroundColor: '#E6F0FF' }]}>
							<MaterialCommunityIcons name="door-open" size={32} color={Colors.primary} />
						</View>
						<ThemedText type="defaultSemiBold" style={[styles.actionButtonText, { color: Colors.primary }]}>
							QL Phòng
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.buttonLight]} onPress={() => router.push('/room-form')}>
						<View style={[styles.actionIconContainer, { backgroundColor: '#EAFFEA' }]}>
							<MaterialCommunityIcons name="plus-box-multiple" size={32} color={Colors.secondary} />
						</View>
						<ThemedText type="defaultSemiBold" style={[styles.actionButtonText, { color: Colors.secondary }]}>
							Thêm Phòng
						</ThemedText>
					</TouchableOpacity>
				</View>

				{/* Recent Activity List */}
				<View style={styles.listSection}>
					<View style={styles.sectionHeaderRow}>
						<ThemedText type="subtitle" style={styles.sectionTitle} lightColor="#11181C" darkColor="#ECEDEE">
							Xe Ra/Vào Gần Đây
						</ThemedText>
						<TouchableOpacity>
							<ThemedText type="small" style={{ color: Colors.primary, fontWeight: '600' }}>
								Xem tất cả
							</ThemedText>
						</TouchableOpacity>
					</View>

					<ThemedView style={styles.listCard} lightColor="#fff" darkColor="#151718">
						{MOCK_RECENT_ACTIVITY.map((item, index) => (
							<TouchableOpacity key={item.id} onPress={() => router.push(`/vehicles/${item.id}` as any)} activeOpacity={0.7}>
								<View style={[styles.listItem, index !== MOCK_RECENT_ACTIVITY.length - 1 && styles.borderBottom]}>
									<View style={[styles.actionIconContainerSm, { backgroundColor: item.type === 'in' ? '#EAFFEA' : '#FFEBEB' }]}>
										<MaterialCommunityIcons name={item.type === 'in' ? 'arrow-down-left' : 'arrow-up-right'} size={20} color={item.type === 'in' ? Colors.secondary : '#E02424'} />
									</View>
									<View style={styles.listItemContent}>
										<ThemedText type="defaultSemiBold" style={styles.plateNumber}>
											{item.plate}
										</ThemedText>
										<ThemedText type="small" style={{ color: '#687076' }}>
											Phòng {item.room}
										</ThemedText>
									</View>
									<ThemedText type="small" style={{ color: '#9BA1A6' }}>
										{item.time}
									</ThemedText>
								</View>
							</TouchableOpacity>
						))}
					</ThemedView>
				</View>

				{/* Guest Vehicles Today */}
				<View style={styles.listSection}>
					<View style={styles.sectionHeaderRow}>
						<ThemedText type="subtitle" style={styles.sectionTitle} lightColor="#11181C" darkColor="#ECEDEE">
							Xe Khách Trong Ngày
						</ThemedText>
						<TouchableOpacity>
							<ThemedText type="small" style={{ color: Colors.primary, fontWeight: '600' }}>
								Xem tất cả
							</ThemedText>
						</TouchableOpacity>
					</View>

					<ThemedView style={styles.listCard} lightColor="#fff" darkColor="#151718">
						{MOCK_GUEST_VEHICLES.map((item, index) => (
							<TouchableOpacity key={item.id} onPress={() => router.push(`/vehicles/guest_${item.id}` as any)} activeOpacity={0.7}>
								<View style={[styles.listItem, index !== MOCK_GUEST_VEHICLES.length - 1 && styles.borderBottom]}>
									<View style={[styles.actionIconContainerSm, { backgroundColor: '#F0F7FF' }]}>
										<MaterialCommunityIcons name="account-clock" size={20} color="#0056D2" />
									</View>
									<View style={styles.listItemContent}>
										<ThemedText type="defaultSemiBold" style={styles.plateNumber}>
											{item.plate}
										</ThemedText>
										<ThemedText type="small" style={{ color: '#687076' }}>
											{item.description}
										</ThemedText>
									</View>
									<View style={{ alignItems: 'flex-end' }}>
										<ThemedText type="small" style={{ color: '#11181C', fontWeight: '500' }}>
											Phòng {item.visitRoom}
										</ThemedText>
										<ThemedText type="small" style={{ color: '#9BA1A6' }}>
											Vào lúc: {item.checkInTime}
										</ThemedText>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</ThemedView>
				</View>
			</ThemedScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
		paddingBottom: 100,
	},
	statsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginBottom: 24,
	},
	statCard: {
		flex: 1, // Take up available space (half width)
		minWidth: '45%',
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	fullWidthCard: {
		minWidth: '100%',
	},
	cardHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
	},
	statValue: {
		fontWeight: '800',
		fontSize: 28,
		lineHeight: 34,
		color: '#11181C', // High contrast by default, will need theme adjustment if Text doesn't handle it (ThemedText does)
	},
	statLabel: {
		marginTop: 4,
	},
	roomStatsRow: {
		flexDirection: 'row',
		alignItems: 'baseline',
		gap: 4,
	},
	statSubValue: {
		fontWeight: '600',
	},
	sectionTitle: {
		fontWeight: 'bold',
		marginBottom: 16,
		textTransform: 'uppercase',
		fontSize: 14,
	},
	actionsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	actionButton: {
		width: '48%', // Approx 2 columns
		borderRadius: 16,
		paddingVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	buttonBlue: {
		backgroundColor: Colors.primary,
	},
	buttonDark: {
		backgroundColor: '#11181C',
	},
	buttonLight: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#E6E8EB',
	},
	actionIconContainer: {
		marginBottom: 12,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: 'rgba(255,255,255,0.2)', // For colored buttons
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionButtonText: {
		color: '#fff',
		letterSpacing: 0.5,
	},
	listSection: {
		marginTop: 24,
	},
	sectionHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	listCard: {
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#F0F0F0',
	},
	actionIconContainerSm: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	listItemContent: {
		flex: 1,
	},
	plateNumber: {
		fontSize: 15,
		marginBottom: 2,
	},
});
