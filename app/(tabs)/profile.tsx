import { ThemedSwitch } from '@/components/switch';
import { ThemedText } from '@/components/themed-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
	const [largeTextEnabled, setLargeTextEnabled] = useState(true);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	const renderSettingItem = (
		icon: keyof typeof MaterialCommunityIcons.glyphMap,
		title: string,
		subtitle?: string,
		type: 'toggle' | 'link' = 'link',
		value?: boolean,
		onValueChange?: (val: boolean) => void,
	) => {
		return (
			<View style={styles.settingItem}>
				<View style={styles.settingIconContainer}>
					<MaterialCommunityIcons name={icon} size={24} color="#40B5A6" />
				</View>
				<View style={styles.settingContent}>
					<ThemedText style={styles.settingTitle}>{title}</ThemedText>
					{subtitle && <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>}
				</View>
				{type === 'toggle' ? <ThemedSwitch onValueChange={onValueChange} value={value} /> : <MaterialCommunityIcons name="chevron-right" size={24} color="#C4C4C4" />}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton}>
					<MaterialCommunityIcons name="chevron-left" size={28} color="#11181C" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Cài Đặt Ứng Dụng</ThemedText>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* User Card */}
				<View style={styles.userCard}>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
						}}
						style={styles.avatar}
					/>
					<View style={styles.userInfo}>
						<ThemedText style={styles.userName}>Bác Nguyễn Văn A</ThemedText>
						<ThemedText style={styles.userRole}>Chủ nhà trọ • 0901 234 567</ThemedText>
						<TouchableOpacity style={styles.editProfileButton}>
							<ThemedText style={styles.editProfileText}>Chỉnh sửa hồ sơ</ThemedText>
						</TouchableOpacity>
					</View>
				</View>

				{/* Settings Section: Display & Sound */}
				<ThemedText style={styles.sectionHeader}>CÀI ĐẶT HIỂN THỊ & ÂM THANH</ThemedText>
				<View style={styles.sectionContainer}>
					{renderSettingItem('format-size', 'Chữ phóng to', 'Giúp bác đọc rõ hơn', 'toggle', largeTextEnabled, setLargeTextEnabled)}
					<View style={styles.divider} />
					{renderSettingItem('bell-ring', 'Thông báo xe ra vào', 'Rung và chuông khi có xe', 'toggle', notificationsEnabled, setNotificationsEnabled)}
				</View>

				{/* Settings Section: Security & Management */}
				<ThemedText style={styles.sectionHeader}>BẢO MẬT & QUẢN LÝ</ThemedText>
				<View style={styles.sectionContainer}>
					<TouchableOpacity>{renderSettingItem('lock', 'Mật khẩu ứng dụng')}</TouchableOpacity>
					<View style={styles.divider} />
					<TouchableOpacity>{renderSettingItem('help-circle', 'Hướng dẫn sử dụng')}</TouchableOpacity>
					<View style={styles.divider} />
					<TouchableOpacity>{renderSettingItem('headset', 'Liên hệ hỗ trợ kỹ thuật')}</TouchableOpacity>
				</View>

				{/* Footer Actions */}
				<TouchableOpacity style={styles.emergencyButton}>
					<MaterialCommunityIcons name="map-marker-radius" size={24} color="#E02424" />
					<ThemedText style={styles.emergencyText}>TRỢ GIÚP KHẨN CẤP</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity style={styles.logoutButton}>
					<ThemedText style={styles.logoutText}>Đăng xuất tài khoản</ThemedText>
				</TouchableOpacity>

				<ThemedText style={styles.versionText}>Phiên bản 2.4.0 (2024)</ThemedText>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F7F9',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#fff',
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#11181C',
	},
	scrollContent: {
		padding: 20,
	},
	userCard: {
		flexDirection: 'row',
		backgroundColor: '#fff',
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
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#11181C',
		marginBottom: 4,
	},
	userRole: {
		fontSize: 14,
		color: '#40B5A6',
		marginBottom: 8,
		fontWeight: '500',
	},
	editProfileButton: {
		backgroundColor: '#E6F7F5',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 12,
		alignSelf: 'flex-start',
	},
	editProfileText: {
		color: '#40B5A6',
		fontSize: 12,
		fontWeight: '600',
	},
	sectionHeader: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#687076',
		marginBottom: 12,
		marginLeft: 4,
		textTransform: 'uppercase',
	},
	sectionContainer: {
		backgroundColor: '#fff',
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
		backgroundColor: '#F0F9F8',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	settingContent: {
		flex: 1,
	},
	settingTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#11181C',
	},
	settingSubtitle: {
		fontSize: 12,
		color: '#687076',
		marginTop: 2,
	},
	divider: {
		height: 1,
		backgroundColor: '#F0F0F0',
		marginLeft: 72, // Align with text
	},
	emergencyButton: {
		backgroundColor: '#FEF2F2',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		borderRadius: 16,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: '#FDE8E8',
	},
	emergencyText: {
		color: '#E02424',
		fontWeight: 'bold',
		fontSize: 16,
		marginLeft: 8,
	},
	logoutButton: {
		alignItems: 'center',
		marginBottom: 16,
	},
	logoutText: {
		color: '#687076',
		fontSize: 16,
		fontWeight: '500',
	},
	versionText: {
		textAlign: 'center',
		color: '#9BA1A6',
		fontSize: 12,
		marginBottom: 40,
	},
});
