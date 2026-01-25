import { ThemedSwitch } from '@/components/switch';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedSafeAreaView } from '@/components/ui/safe-area-view';
import { ThemedScrollView } from '@/components/ui/scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSettingsStore } from '@/store/settings-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
	const { isLargeText, setLargeText, theme: settingTheme, setTheme } = useSettingsStore();
	// Use the hook to get the effective color scheme
	const colorScheme = useColorScheme();
	const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

	const isDark = colorScheme === 'dark';
	const backgroundColor = isDark ? '#000000' : '#F5F7F9';
	const cardColor = isDark ? '#151718' : '#FFFFFF';
	const textColor = isDark ? '#ECEDEE' : '#11181C';
	const subTextColor = isDark ? '#9BA1A6' : '#687076';
	const iconBgColor = isDark ? '#1A2E35' : '#F0F9F8';
	const dividerColor = isDark ? '#333333' : '#F0F0F0';

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
				<View style={[styles.settingIconContainer, { backgroundColor: iconBgColor }]}>
					<MaterialCommunityIcons name={icon} size={24} color="#40B5A6" />
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
				{type === 'toggle' ? <ThemedSwitch onValueChange={onValueChange} value={value} /> : <MaterialCommunityIcons name="chevron-right" size={24} color={subTextColor} />}
			</View>
		);
	};

	return (
		<ThemedSafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
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
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontWeight: 'bold',
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
});
