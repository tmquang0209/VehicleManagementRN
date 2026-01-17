import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	const stats = {
		totalVehicles: 45,
		newVehiclesToday: 2,
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons name="garage-variant" size={24} color="#40B5A6" />
				</View>
				<ThemedText style={styles.headerTitle}>QUẢN LÝ XE</ThemedText>
			</View>
			<ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
				{/* Stats Card */}
				<View style={styles.card}>
					<Text style={styles.cardLabel}>Số xe trong nhà:</Text>
					<View style={styles.statsRow}>
						<Text style={styles.statsValue}>{stats.totalVehicles}</Text>
						<Text style={styles.statsUnit}>chiếc</Text>
					</View>
					<View style={styles.subStatsContainer}>
						<MaterialCommunityIcons name="trending-up" size={16} color="#40B5A6" />
						<Text style={styles.subStatsText}>Thêm {stats.newVehiclesToday} xe mới</Text>
					</View>
				</View>

				{/* Action Section */}
				<Text style={styles.sectionTitle}>Chọn công việc cần làm</Text>

				<TouchableOpacity style={[styles.actionButton, styles.buttonGreen]} onPress={() => router.push('/scan')}>
					<View style={styles.actionIconContainer}>
						<MaterialCommunityIcons name="qrcode-scan" size={40} color="#fff" />
					</View>
					<Text style={styles.actionButtonText}>QUÉT BIỂN SỐ</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.actionButton, styles.buttonBlue]} onPress={() => {}}>
					<View style={styles.actionIconContainer}>
						<MaterialCommunityIcons name="account-plus" size={40} color="#fff" />
					</View>
					<Text style={styles.actionButtonText}>ĐĂNG KÝ XE KHÁCH</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F7F9',
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
		backgroundColor: '#DFF2F0', // Light green background
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 0,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#11181C',
		textAlign: 'center',
		flex: 1, // To center title properly
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 24,
		marginBottom: 24,
		// Start Shadow
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		// End Shadow
		borderLeftWidth: 6,
		borderLeftColor: '#40B5A6',
	},
	cardLabel: {
		fontSize: 16,
		color: '#687076',
		marginBottom: 8,
	},
	statsRow: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginBottom: 16,
	},
	statsValue: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#40B5A6',
		marginRight: 8,
	},
	statsUnit: {
		fontSize: 20,
		fontWeight: '500',
		color: '#11181C',
	},
	subStatsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#E6F7F5',
		alignSelf: 'flex-start',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	subStatsText: {
		marginLeft: 6,
		color: '#40B5A6',
		fontWeight: '600',
		fontSize: 14,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#11181C',
		marginBottom: 16,
	},
	actionButton: {
		borderRadius: 16,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		// Shadow
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
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
});
