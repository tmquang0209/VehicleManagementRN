import { ThemedIcon } from '@/components/themed-icon';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

export type HeaderProps = {
	title: string;
	icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	rightComponent?: React.ReactNode;
	onBackPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

export function Header({ title, icon, rightComponent, onBackPress, style }: HeaderProps) {
	const theme = useColorScheme() ?? 'light';
	const isDark = theme === 'dark';

	return (
		<View style={[styles.header, { backgroundColor: isDark ? '#000' : '#fff' }, style]}>
			<View style={styles.headerLeft}>
				{onBackPress && (
					<TouchableOpacity onPress={onBackPress} style={styles.backButton}>
						<ThemedIcon name="arrow-left" size={24} color={isDark ? 'white' : 'black'} />
					</TouchableOpacity>
				)}
				<View style={[styles.titleContainer, { backgroundColor: isDark ? '#1A2E35' : `${Colors.primary}15` }]}>
					{icon && <ThemedIcon name={icon} size={24} color="primary" />}
					<ThemedText type="subtitle" style={styles.headerTitle} lightColor={Colors.primary} darkColor={Colors.dark.primary}>
						{title}
					</ThemedText>
				</View>
			</View>
			{rightComponent}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8, // Gap between back button and pill
	},
	backButton: {
		padding: 4,
		marginRight: 4,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
	},
	headerTitle: {
		textTransform: 'uppercase',
		fontSize: 16,
	},
});
