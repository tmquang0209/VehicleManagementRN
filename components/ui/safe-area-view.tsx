import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView as NativeSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface ThemedSafeAreaViewProps extends SafeAreaViewProps {
	lightColor?: string;
	darkColor?: string;
}

export function ThemedSafeAreaView({ children, style, lightColor, darkColor, edges = ['top', 'bottom'], ...rest }: ThemedSafeAreaViewProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

	return (
		<NativeSafeAreaView edges={edges} style={[styles.container, { backgroundColor }, style]} {...rest}>
			{children}
		</NativeSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
