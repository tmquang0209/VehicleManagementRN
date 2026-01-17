import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { ScanButton } from '@/components/scan-button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TINT_COLOR = '#40B5A6';

export default function TabLayout() {
	const router = useRouter();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: TINT_COLOR,
				tabBarInactiveTintColor: '#687076',
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarShowLabel: true,
				tabBarStyle: styles.tabBar,
				tabBarLabelStyle: styles.label,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Trang chủ',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="device-list"
				options={{
					title: 'Danh sách',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="car" color={color} />,
				}}
			/>

			{/* Custom Middle Scan Button */}
			<Tabs.Screen
				name="scan_tab" // Dummy route name
				options={{
					title: 'Quét mã',
					tabBarButton: (props) => <ScanButton onPress={() => router.push('/scan')} />,
				}}
				listeners={() => ({
					tabPress: (e) => {
						e.preventDefault(); // Prevent navigation to dummy route
						router.push('/scan');
					},
				})}
			/>

			<Tabs.Screen
				name="notifications"
				options={{
					title: 'Thông báo',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="bell" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Tài khoản',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account" color={color} />,
				}}
			/>

			{/* Hide unused routes if any (e.g. menu) */}
			<Tabs.Screen name="menu" options={{ href: null }} />
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		elevation: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: 80, // Taller tab bar
		paddingTop: 8,
		paddingBottom: 20, // Adjust for safe area
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: -4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		borderTopWidth: 0, // Remove default line
	},
	label: {
		fontSize: 12,
		fontWeight: '600',
		marginTop: 4,
	},
});
