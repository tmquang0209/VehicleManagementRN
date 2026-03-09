import { ThemedSwitch } from '@/components/switch';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/ui/header';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useHouseStore } from '@/store/house-store';
import { useSettingsStore } from '@/store/settings-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function ProfileScreen() {
	const { isLargeText, setLargeText, theme: settingTheme, setTheme } = useSettingsStore();
	const { houses, selectedHouseId, setSelectedHouse } = useHouseStore();
	// Use the hook to get the effective color scheme
	const colorScheme = useColorScheme();
	const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
	const [isHouseModalVisible, setIsHouseModalVisible] = useState(false);

	const isDark = colorScheme === 'dark';
	const backgroundColor = isDark ? '#000000' : '#F5F7F9';
	const cardColor = isDark ? '#151718' : '#FFFFFF';
	const textColor = isDark ? '#ECEDEE' : '#11181C';
	const subTextColor = isDark ? '#9BA1A6' : '#687076';
	const iconBgColor = isDark ? '#1A2E35' : '#E6F0FF';
	const dividerColor = isDark ? '#333333' : '#F0F0F0';

	const selectedHouse = houses.find((h) => h.id === selectedHouseId);

	const renderSettingItem = (
		icon: keyof typeof MaterialCommunityIcons.glyphMap,
		title: string,
		subtitle?: string,
		type: 'toggle' | 'link' | 'custom' = 'link',
		value?: boolean,
		onValueChange?: (val: boolean) => void,
		customRight?: React.ReactNode,
	) => {
		return (
			<View style={styles.settingItem}>
				<View style={[styles.settingIconContainer, { backgroundColor: iconBgColor }]}>
					<MaterialCommunityIcons name={icon} size={24} color="#0056D2" />
				</View>
				<View style={styles.settingContent}>
					<ThemedText type="defaultSemiBold" style={[styles.settingTitle, { color: textColor }]}>
						{title}
					</ThemedText>
					{subtitle && (
						<ThemedText type="small" style={[styles.settingSubtitle, { color: subTextColor }]}>
							{subtitle}
						</ThemedText>
					)}
				</View>
				{type === 'toggle' ? (
					<ThemedSwitch onValueChange={onValueChange} value={value} />
				) : type === 'custom' ? (
					customRight
				) : (
					<MaterialCommunityIcons name="chevron-right" size={24} color={subTextColor} />
				)}
			</View>
		);
	};

	return (
		<ThemedSafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
			{/* Header */}
			<Header title="TÀI KHOẢN" icon="account" />

			<ThemedScrollView contentContainerStyle={styles.scrollContent}>
				{/* User Card */}
				<View style={[styles.userCard, { backgroundColor: cardColor }]}>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
						}}
						style={styles.avatar}
					/>
					<View style={styles.userInfo}>
						<ThemedText type="large" style={[styles.userName, { color: textColor }]}>
							Bác Nguyễn Văn A
						</ThemedText>
						<ThemedText type="medium" style={styles.userRole}>
							Chủ nhà trọ • 0901 234 567
						</ThemedText>
						<ThemedButton title="Chỉnh sửa hồ sơ" size="sm" variant="secondary" style={styles.editProfileButton} />
					</View>
				</View>

				{/* House Selection Section */}
				<ThemedText type="medium" style={[styles.sectionHeader, { color: subTextColor }]}>
					ĐANG QUẢN LÝ
				</ThemedText>
				<View style={[styles.sectionContainer, { backgroundColor: cardColor }]}>
					<TouchableOpacity onPress={() => setIsHouseModalVisible(true)}>
						{renderSettingItem(
							'office-building',
							'Chọn Nhà / Tòa nhà',
							selectedHouse?.name || 'Chưa chọn',
							'custom',
							undefined,
							undefined,
							<View style={styles.housePickerValue}>
								<ThemedText type="defaultSemiBold" style={{ color: '#0056D2', marginRight: 4 }}>
									Thay đổi
								</ThemedText>
								<MaterialCommunityIcons name="menu-down" size={24} color="#0056D2" />
							</View>,
						)}
					</TouchableOpacity>
				</View>

				{/* Settings Section: Display & Sound */}
				<ThemedText type="medium" style={[styles.sectionHeader, { color: subTextColor }]}>
					CÀI ĐẶT HIỂN THỊ & ÂM THANH
				</ThemedText>
				<View style={[styles.sectionContainer, { backgroundColor: cardColor }]}>
					{renderSettingItem('theme-light-dark', 'Chế độ tối', 'Giao diện nền tối', 'toggle', settingTheme === 'dark', (val) => setTheme(val ? 'dark' : 'light'))}
					<View style={[styles.divider, { backgroundColor: dividerColor }]} />
					{renderSettingItem('format-size', 'Chữ phóng to', 'Giúp bác đọc rõ hơn', 'toggle', isLargeText, setLargeText)}
					<View style={[styles.divider, { backgroundColor: dividerColor }]} />
					{renderSettingItem('bell-ring', 'Thông báo xe ra vào', 'Rung và chuông khi có xe', 'toggle', notificationsEnabled, setNotificationsEnabled)}
				</View>

				{/* Settings Section: Security & Management */}
				<ThemedText type="medium" style={[styles.sectionHeader, { color: subTextColor }]}>
					BẢO MẬT & QUẢN LÝ
				</ThemedText>
				<View style={[styles.sectionContainer, { backgroundColor: cardColor }]}>
					<TouchableOpacity>{renderSettingItem('lock', 'Mật khẩu ứng dụng')}</TouchableOpacity>
					<View style={[styles.divider, { backgroundColor: dividerColor }]} />
					<TouchableOpacity>{renderSettingItem('help-circle', 'Hướng dẫn sử dụng')}</TouchableOpacity>
					<View style={[styles.divider, { backgroundColor: dividerColor }]} />
					<TouchableOpacity>{renderSettingItem('headset', 'Liên hệ hỗ trợ kỹ thuật')}</TouchableOpacity>
				</View>

				{/* Footer Actions */}
				<ThemedButton title="TRỢ GIÚP KHẨN CẤP" variant="danger" icon={<MaterialCommunityIcons name="map-marker-radius" size={24} color="#FFF" />} style={styles.emergencyButton} />

				<ThemedButton title="Đăng xuất tài khoản" variant="ghost" onPress={() => router.push('/login')} style={styles.logoutButton} />

				<ThemedText type="small" style={[styles.versionText, { color: subTextColor }]}>
					Phiên bản 2.4.0 (2024)
				</ThemedText>
			</ThemedScrollView>

			{/* House Selection Modal */}
			<Modal visible={isHouseModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsHouseModalVisible(false)}>
				<TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsHouseModalVisible(false)}>
					<TouchableWithoutFeedback>
						<View style={[styles.modalContent, { backgroundColor: cardColor }]}>
							<View style={styles.modalHeader}>
								<ThemedText type="subtitle" style={{ color: textColor }}>
									Chọn nhà
								</ThemedText>
								<TouchableOpacity onPress={() => setIsHouseModalVisible(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
									<MaterialCommunityIcons name="close" size={24} color={subTextColor} />
								</TouchableOpacity>
							</View>

							{houses.map((house) => (
								<TouchableOpacity
									key={house.id}
									style={[styles.houseOption, selectedHouseId === house.id && { backgroundColor: isDark ? '#1A2E35' : '#F0F7FF' }]}
									onPress={() => {
										setSelectedHouse(house.id);
										setIsHouseModalVisible(false);
									}}
								>
									<View style={[styles.houseOptionIcon, { backgroundColor: iconBgColor }]}>
										<MaterialCommunityIcons name="home-city-outline" size={24} color="#0056D2" />
									</View>
									<View style={styles.houseOptionText}>
										<ThemedText type="defaultSemiBold" style={{ color: textColor }}>
											{house.name}
										</ThemedText>
										<ThemedText type="small" style={{ color: subTextColor, marginTop: 2 }}>
											{house.address}
										</ThemedText>
										<ThemedText type="small" style={{ color: '#0056D2', marginTop: 4, fontWeight: '500' }}>
											{house.occupiedRooms}/{house.totalRooms} phòng • {house.totalVehicles} xe
										</ThemedText>
									</View>
									{selectedHouseId === house.id && <MaterialCommunityIcons name="check-circle" size={24} color="#0056D2" />}
								</TouchableOpacity>
							))}

							<TouchableOpacity
								style={styles.addHouseButton}
								onPress={() => {
									setIsHouseModalVisible(false);
									router.push('/house-form');
								}}
							>
								<MaterialCommunityIcons name="plus-circle-outline" size={24} color="#0056D2" />
								<ThemedText type="defaultSemiBold" style={{ color: '#0056D2', marginLeft: 8 }}>
									Thêm Nhà / Tòa nhà mới
								</ThemedText>
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</TouchableOpacity>
			</Modal>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	userCard: {
		flexDirection: 'row',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		marginBottom: 24,
		// Shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 16,
	},
	userInfo: {
		flex: 1,
		alignItems: 'flex-start',
	},
	userName: {
		fontWeight: 'bold',
		marginBottom: 4,
	},
	userRole: {
		color: '#40B5A6',
		marginBottom: 8,
		fontWeight: '500',
	},
	editProfileButton: {
		marginBottom: 0,
	},
	sectionHeader: {
		fontWeight: 'bold',
		marginBottom: 12,
		marginLeft: 4,
		textTransform: 'uppercase',
	},
	sectionContainer: {
		borderRadius: 20,
		padding: 4,
		marginBottom: 24,
		// Shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	settingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	settingIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	settingContent: {
		flex: 1,
	},
	settingTitle: {
		fontWeight: '600',
	},
	settingSubtitle: {
		marginTop: 2,
	},
	divider: {
		height: 1,
		marginLeft: 72,
	},
	emergencyButton: {
		marginBottom: 24,
	},
	logoutButton: {
		marginBottom: 16,
	},
	versionText: {
		textAlign: 'center',
		marginBottom: 40,
	},
	housePickerValue: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		paddingBottom: 40,
		minHeight: '40%',
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24,
	},
	houseOption: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
	},
	houseOptionIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	houseOptionText: {
		flex: 1,
	},
	addHouseButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		marginTop: 8,
		borderRadius: 12,
		backgroundColor: '#E6F0FF', // matching light blue primary
	},
});
