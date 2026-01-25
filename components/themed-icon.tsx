import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Map local keys to the unified Colors theme
const COLORS = {
	primary: { light: Colors.light.primary, dark: Colors.dark.primary },
	secondary: { light: Colors.light.success, dark: Colors.dark.success }, // Secondary is Green in unified theme
	success: { light: Colors.light.success, dark: Colors.dark.success },
	danger: { light: Colors.light.danger, dark: Colors.dark.danger },
	warning: { light: '#F59E0B', dark: '#FBBF24' },
	info: { light: '#0a7ea4', dark: '#38BDF8' },
	gray: { light: '#687076', dark: '#9BA1A6' },
	red: { light: Colors.light.danger, dark: Colors.dark.danger },
	blue: { light: Colors.light.primary, dark: Colors.dark.primary },
	green: { light: Colors.light.success, dark: Colors.dark.success },
	white: { light: '#FFFFFF', dark: '#FFFFFF' },
	black: { light: '#000000', dark: '#000000' },
};

export type ThemedIconProps = {
	lightColor?: string;
	darkColor?: string;
	color?: keyof typeof COLORS | string; // Allow string (hex)
	name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	size?: number;
	style?: StyleProp<TextStyle>;
};

export function ThemedIcon({ style, lightColor, darkColor, color, name, size = 24, ...rest }: ThemedIconProps) {
	const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';

	let iconColor: string | OpaqueColorValue = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	if (color) {
		if (color in COLORS) {
			iconColor = COLORS[color as keyof typeof COLORS][theme];
		} else {
			// Assume it's a hex string or valid color string
			iconColor = color;
		}
	}

	return <MaterialCommunityIcons name={name} size={size} color={iconColor as string} style={style} {...rest} />;
}
