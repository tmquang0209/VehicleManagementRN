import { Text, type TextProps } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useSettingsStore } from '@/store/settings-store';

const COLORS = {
	primary: { light: '#0056D2', dark: '#409CFF' },
	secondary: { light: '#526D82', dark: '#A0AAB5' },
	success: { light: '#28a745', dark: '#4ADE80' },
	danger: { light: '#E02424', dark: '#FF6B6B' },
	warning: { light: '#F59E0B', dark: '#FBBF24' },
	info: { light: '#0a7ea4', dark: '#38BDF8' },
	gray: { light: '#687076', dark: '#9BA1A6' },
	red: { light: '#E02424', dark: '#FF6B6B' },
	blue: { light: '#0056D2', dark: '#409CFF' },
	green: { light: '#28a745', dark: '#4ADE80' },
	white: { light: '#FFFFFF', dark: '#FFFFFF' },
};

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	color?: keyof typeof COLORS;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small' | 'medium' | 'large' | 'extraLarge';
};

export function ThemedText({ style, lightColor, darkColor, color, type = 'default', ...rest }: ThemedTextProps) {
	const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';
	const isLargeText = useSettingsStore((state) => state.isLargeText);

	let textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	if (color && COLORS[color]) {
		textColor = COLORS[color][theme];
	}

	const scale = isLargeText ? 1.5 : 1;

	const scaledStyles = {
		default: {
			fontSize: 16 * scale,
			lineHeight: 24 * scale,
		},
		defaultSemiBold: {
			fontSize: 16 * scale,
			lineHeight: 24 * scale,
			fontWeight: '600' as const,
		},
		title: {
			fontSize: 32 * scale,
			fontWeight: 'bold' as const,
			lineHeight: 32 * scale,
		},
		subtitle: {
			fontSize: 20 * scale,
			fontWeight: 'bold' as const,
		},
		link: {
			lineHeight: 30 * scale,
			fontSize: 16 * scale,
			color: '#0a7ea4',
		},
		small: {
			fontSize: 12 * scale,
			lineHeight: 18 * scale,
		},
		medium: {
			fontSize: 14 * scale,
			lineHeight: 20 * scale,
		},
		large: {
			fontSize: 18 * scale,
			lineHeight: 26 * scale,
			fontWeight: 'bold' as const,
		},
		extraLarge: {
			fontSize: 48 * scale,
			lineHeight: 56 * scale,
			fontWeight: 'bold' as const,
		},
	};

	return (
		<Text
			style={[
				{ color: textColor },
				type === 'default' ? scaledStyles.default : undefined,
				type === 'title' ? scaledStyles.title : undefined,
				type === 'defaultSemiBold' ? scaledStyles.defaultSemiBold : undefined,
				type === 'subtitle' ? scaledStyles.subtitle : undefined,
				type === 'link' ? scaledStyles.link : undefined,
				type === 'small' ? scaledStyles.small : undefined,
				type === 'medium' ? scaledStyles.medium : undefined,
				type === 'large' ? scaledStyles.large : undefined,
				type === 'extraLarge' ? scaledStyles.extraLarge : undefined,
				style,
			]}
			{...rest}
		/>
	);
}
