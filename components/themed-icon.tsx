import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Reuse the same COLORS definition from ThemedText or import it if it was shared.
// Since it was local in ThemedText, I will duplicate or ideally move it to a shared constant.
// For now, I will duplicate for speed and consistency with ThemedText pattern unless there is a constants/colors.ts (which there is: constants/theme.ts).
// ThemedText had a custom COLORS object. I will stick to that to be safe.

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

export type ThemedIconProps = {
	lightColor?: string;
	darkColor?: string;
	color?: keyof typeof COLORS;
	name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	size?: number;
	style?: StyleProp<TextStyle>;
};

export function ThemedIcon({ style, lightColor, darkColor, color, name, size = 24, ...rest }: ThemedIconProps) {
	const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';

	let iconColor: string | OpaqueColorValue = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	if (color && COLORS[color]) {
		iconColor = COLORS[color][theme];
	}

	return <MaterialCommunityIcons name={name} size={size} color={iconColor} style={style} {...rest} />;
}
