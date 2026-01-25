import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
	const theme = useColorScheme() ?? 'light';
	const activeColors = Colors[theme];

	// Mock Stats - In a real app this would come from a store or API
	const stats = {
		totalHouses: 3,
		totalRooms: 45,
		occupiedRooms: 38,
		emptyRooms: 7,
		totalVehicles: 85,
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			{/* Header */}
			<Header title="TỔNG QUAN" icon="view-dashboard" />

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
						</View>
					</ThemedView>
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

					<TouchableOpacity style={[styles.actionButton, styles.buttonDark]} onPress={() => router.push('/house-form')}>
						<View style={styles.actionIconContainer}>
							<MaterialCommunityIcons name="home-plus" size={32} color="#fff" />
						</View>
						<ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
							Thêm Nhà
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.buttonLight]} onPress={() => router.push('/(tabs)/room-list')}>
						<View style={[styles.actionIconContainer, { backgroundColor: '#E6F0FF' }]}>
							<MaterialCommunityIcons name="door-closed" size={32} color={Colors.primary} />
						</View>
						<ThemedText type="defaultSemiBold" style={[styles.actionButtonText, { color: Colors.primary }]}>
							QL Phòng
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.actionButton, styles.buttonLight]} onPress={() => router.push('/add-vehicle')}>
						<View style={[styles.actionIconContainer, { backgroundColor: '#EAFFEA' }]}>
							<MaterialCommunityIcons name="bike" size={32} color={Colors.secondary} />
						</View>
						<ThemedText type="defaultSemiBold" style={[styles.actionButtonText, { color: Colors.secondary }]}>
							Thêm Xe
						</ThemedText>
					</TouchableOpacity>
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
});
