import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function VehicleDetailScreen() {
	const { id } = useLocalSearchParams();
	const theme = useColorScheme() ?? 'light';
	const activeColors = Colors[theme];

	// Temporary mock fetch logic based on `id`
	type VehicleType = 'RESIDENT' | 'GUEST';
	const isGuestId = id === '3' || (typeof id === 'string' && id.startsWith('guest_'));

	const mockVehicle = {
		id: id as string,
		licensePlate: isGuestId ? '60-B1 098.76' : '29A-123.45',
		model: isGuestId ? 'Honda Wave - Đen' : 'Honda SH 150i ABS',
		imageUrl: isGuestId
			? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'
			: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
		roomName: isGuestId ? 'Đến thăm: Phòng 301' : 'Phòng 101',
		type: (isGuestId ? 'GUEST' : 'RESIDENT') as VehicleType,
		ownerName: isGuestId ? 'Đinh Thanh Tùng' : 'Nguyễn Văn A',
		ownerPhone: isGuestId ? '0988765432' : '0901234567',
		checkInTime: new Date(Date.now() - 3600000).toISOString(),
		lastActive: new Date().toISOString(),
	};

	const isGuest = mockVehicle.type === 'GUEST';

	return (
		<ThemedSafeAreaView style={styles.container} lightColor="#F5F7F9" darkColor="#000">
			<Header title="CHI TIẾT XE" onBackPress={() => router.back()} />

			<ThemedScrollView showsVerticalScrollIndicator={false}>
				{/* Top Image Banner */}
				<View style={styles.imageContainer}>
					<Image source={{ uri: mockVehicle.imageUrl }} style={styles.headerImage} resizeMode="cover" />
					<View style={styles.badgeContainer}>
						<View style={[styles.badge, isGuest ? styles.badgeGuest : styles.badgeResident]}>
							<ThemedText type="small" style={[styles.badgeText, isGuest ? styles.badgeTextGuest : styles.badgeTextResident]}>
								{isGuest ? 'Xe Khách' : 'Xe Cư Dân'}
							</ThemedText>
						</View>
					</View>
				</View>

				<View style={styles.contentContainer}>
					{/* Vehicle Header Info */}
					<View style={styles.headerInfo}>
						<ThemedText type="subtitle" style={styles.licensePlate}>
							{mockVehicle.licensePlate}
						</ThemedText>
						<ThemedText style={styles.modelName} lightColor="#687076" darkColor="#9BA1A6">
							{mockVehicle.model}
						</ThemedText>
					</View>

					{/* Owner / Guest Information Card */}
					<ThemedText type="subtitle" style={styles.sectionTitle} lightColor="#11181C" darkColor="#ECEDEE">
						{isGuest ? 'Thông tin khách' : 'Thông tin chủ xe'}
					</ThemedText>

					<ThemedView style={styles.card} lightColor="#fff" darkColor="#151718">
						<View style={styles.infoRow}>
							<View style={styles.iconCircle}>
								<MaterialCommunityIcons name="account" size={24} color={activeColors.primary} />
							</View>
							<View style={styles.infoTextContainer}>
								<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
									{isGuest ? 'Tên khách' : 'Chủ sở hữu'}
								</ThemedText>
								<ThemedText type="defaultSemiBold">{mockVehicle.ownerName}</ThemedText>
							</View>
						</View>
						<View style={styles.divider} />
						<View style={styles.infoRow}>
							<View style={styles.iconCircle}>
								{/* Type override because secondary does not exist on Dark Theme fallback safely */}
								<MaterialCommunityIcons name={isGuest ? 'door-closed-lock' : 'door-open'} size={24} color={'#E91E63'} />
							</View>
							<View style={styles.infoTextContainer}>
								<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
									{isGuest ? 'Phòng đăng ký đến thăm' : 'Đăng ký tại'}
								</ThemedText>
								<ThemedText type="defaultSemiBold">{mockVehicle.roomName}</ThemedText>
							</View>
						</View>
						<View style={styles.divider} />
						<View style={styles.infoRow}>
							<View style={styles.iconCircle}>
								<MaterialCommunityIcons name="phone" size={24} color="#00C853" />
							</View>
							<View style={styles.infoTextContainer}>
								<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
									Số điện thoại liên hệ
								</ThemedText>
								<ThemedText type="defaultSemiBold">{mockVehicle.ownerPhone}</ThemedText>
							</View>
						</View>
						{isGuest && (
							<>
								<View style={styles.divider} />
								<View style={styles.infoRow}>
									<View style={styles.iconCircle}>
										<MaterialCommunityIcons name="card-account-details-outline" size={24} color="#0056D2" />
									</View>
									<View style={styles.infoTextContainer}>
										<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
											Giấy tờ (CCCD/CMND) lưu lại
										</ThemedText>
										<ThemedText type="defaultSemiBold">012345678910</ThemedText>
									</View>
								</View>
							</>
						)}
					</ThemedView>

					{/* Parking Logs */}
					<ThemedText type="subtitle" style={[styles.sectionTitle, { marginTop: 24 }]} lightColor="#11181C" darkColor="#ECEDEE">
						Lịch sử ra vào gần nhất
					</ThemedText>
					<ThemedView style={styles.card} lightColor="#fff" darkColor="#151718">
						<View style={styles.timelineItem}>
							<View style={styles.timelineDot} />
							<View style={styles.timelineLine} />
							<View style={styles.timelineContent}>
								<ThemedText type="defaultSemiBold" style={{ color: activeColors.primary }}>
									Đã vào bãi
								</ThemedText>
								<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
									{dayjs(mockVehicle.checkInTime).format('HH:mm - DD/MM/YYYY')}
								</ThemedText>
							</View>
						</View>

						<View style={styles.timelineItem}>
							<View style={[styles.timelineDot, { backgroundColor: activeColors.tint }]} />
							<View style={styles.timelineContent}>
								<ThemedText type="defaultSemiBold">Cập nhật lần cuối</ThemedText>
								<ThemedText type="small" lightColor="#687076" darkColor="#9BA1A6">
									{dayjs(mockVehicle.lastActive).format('HH:mm - DD/MM/YYYY')}
								</ThemedText>
							</View>
						</View>
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
	imageContainer: {
		width: '100%',
		height: 250,
		position: 'relative',
	},
	headerImage: {
		width: '100%',
		height: '100%',
	},
	badgeContainer: {
		position: 'absolute',
		bottom: -16,
		right: 24,
		zIndex: 2,
	},
	badge: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	contentContainer: {
		padding: 24,
		paddingTop: 32,
		paddingBottom: 60,
	},
	headerInfo: {
		marginBottom: 32,
		alignItems: 'center',
	},
	licensePlate: {
		fontSize: 32,
		fontWeight: '800',
		textTransform: 'uppercase',
		lineHeight: 40,
	},
	modelName: {
		fontSize: 16,
		marginTop: 4,
	},
	sectionTitle: {
		fontSize: 14,
		textTransform: 'uppercase',
		fontWeight: '700',
		marginBottom: 16,
	},
	card: {
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	divider: {
		height: 1,
		backgroundColor: 'rgba(150, 150, 150, 0.1)',
		marginVertical: 4,
	},
	iconCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: 'rgba(150, 150, 150, 0.05)',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	infoTextContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	badgeText: {
		fontSize: 11,
		fontWeight: '800',
	},
	badgeResident: {
		backgroundColor: '#E6F0FF',
		borderWidth: 2,
		borderColor: '#fff',
	},
	badgeTextResident: {
		color: '#0066FF',
	},
	badgeGuest: {
		backgroundColor: '#FFF0D4',
		borderWidth: 2,
		borderColor: '#fff',
	},
	badgeTextGuest: {
		color: '#D47A00',
	},
	timelineItem: {
		flexDirection: 'row',
		minHeight: 60,
		position: 'relative',
	},
	timelineDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#0066FF',
		marginTop: 4,
		marginRight: 16,
		zIndex: 2,
	},
	timelineLine: {
		position: 'absolute',
		left: 5,
		top: 16,
		bottom: -4,
		width: 2,
		backgroundColor: 'rgba(150,150,150,0.15)',
		zIndex: 1,
	},
	timelineContent: {
		flex: 1,
		paddingBottom: 20,
	},
});
