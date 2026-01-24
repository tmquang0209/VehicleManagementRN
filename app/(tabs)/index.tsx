import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
	const theme = useColorScheme() ?? 'light';
	const stats = {
		totalVehicles: 45,
		newVehiclesToday: 2,
	};

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			<View style={styles.header}>
				<View style={[styles.iconContainer, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#DFF2F0' }]}>
					<MaterialCommunityIcons name="garage-variant" size={24} color="#40B5A6" />
				</View>
				<ThemedText type="subtitle" style={styles.headerTitle} lightColor="#11181C" darkColor="#ECEDEE">
					QUẢN LÝ XE
				</ThemedText>
			</View>
			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				{/* Stats Card */}
				<ThemedView style={styles.card} lightColor="#fff" darkColor="#151718">
					<ThemedText type="default" style={styles.cardLabel} lightColor="#687076" darkColor="#9BA1A6">
						Số xe trong nhà:
					</ThemedText>
					<View style={styles.statsRow}>
						<ThemedText type="extraLarge" style={styles.statsValue}>
							{stats.totalVehicles}
						</ThemedText>
						<ThemedText type="subtitle" style={styles.statsUnit} lightColor="#11181C" darkColor="#ECEDEE">
							chiếc
						</ThemedText>
					</View>
					<View style={[styles.subStatsContainer, { backgroundColor: theme === 'dark' ? '#1A2E35' : '#E6F7F5' }]}>
						<MaterialCommunityIcons name="trending-up" size={16} color="#40B5A6" />
						<ThemedText type="medium" style={styles.subStatsText}>
							Thêm {stats.newVehiclesToday} xe mới
						</ThemedText>
					</View>
				</ThemedView>

				{/* Action Section */}
				<ThemedText type="subtitle" style={styles.sectionTitle} lightColor="#11181C" darkColor="#ECEDEE">
					Chọn công việc cần làm
				</ThemedText>

				<TouchableOpacity style={[styles.actionButton, styles.buttonGreen]} onPress={() => router.push('/scan')}>
					<View style={styles.actionIconContainer}>
						<MaterialCommunityIcons name="qrcode-scan" size={40} color="#fff" />
					</View>
					<ThemedText type="large" style={styles.actionButtonText}>
						QUÉT BIỂN SỐ
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.actionButton, styles.buttonBlue]} onPress={() => router.push('/add-vehicle')}>
					<View style={styles.actionIconContainer}>
						<MaterialCommunityIcons name="account-plus" size={40} color="#fff" />
					</View>
					<ThemedText type="large" style={styles.actionButtonText}>
						ĐĂNG KÝ XE KHÁCH
					</ThemedText>
				</TouchableOpacity>
			</ThemedScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		padding: 20,
		paddingBottom: 100,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginHorizontal: 20,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 0,
	},
	headerTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		flex: 1,
	},
	card: {
		borderRadius: 20,
		padding: 24,
		marginBottom: 24,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		borderLeftWidth: 6,
		borderLeftColor: '#40B5A6',
	},
	cardLabel: {
		marginBottom: 8,
	},
	statsRow: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginBottom: 16,
	},
	statsValue: {
		fontWeight: 'bold',
		color: '#40B5A6',
		marginRight: 8,
	},
	statsUnit: {
		fontWeight: '500',
	},
	subStatsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	subStatsText: {
		marginLeft: 6,
		color: '#40B5A6',
		fontWeight: '600',
	},
	sectionTitle: {
		fontWeight: 'bold',
		marginBottom: 16,
	},
	actionButton: {
		borderRadius: 16,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	buttonGreen: {
		backgroundColor: '#40B5A6',
	},
	buttonBlue: {
		backgroundColor: '#3F86FA',
	},
	actionIconContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'rgba(255,255,255,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
	},
	actionButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		letterSpacing: 1,
	},
});
