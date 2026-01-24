import React from 'react';
import { ScrollView as NativeScrollView, ScrollViewProps, StyleSheet } from 'react-native';

interface ThemedScrollViewProps extends ScrollViewProps {
	contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}

export function ThemedScrollView({ children, style, contentContainerStyle, showsVerticalScrollIndicator = false, ...rest }: ThemedScrollViewProps) {
	return (
		<NativeScrollView style={[styles.container, style]} contentContainerStyle={[styles.contentContainer, contentContainerStyle]} showsVerticalScrollIndicator={showsVerticalScrollIndicator} {...rest}>
			{children}
		</NativeScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		padding: 20,
		paddingBottom: 40,
	},
});
