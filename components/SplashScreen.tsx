import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThemedText } from './themed-text';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
	onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
	const progress = useSharedValue(0);
	const opacity = useSharedValue(1);
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	useEffect(() => {
		// Start progress animation
		progress.value = withTiming(1, { duration: 2500 }, (finished) => {
			if (finished) {
				// Fade out animation
				opacity.value = withTiming(0, { duration: 500 }, (isFinished) => {
					if (isFinished) {
						runOnJS(onFinish)();
					}
				});
			}
		});
	}, []);

	const progressBarStyle = useAnimatedStyle(() => {
		return {
			width: progress.value * (width * 0.7), // 70% of screen width
		};
	});

	const containerStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	// Dynamic Styles
	const backgroundColor = isDark ? '#000000' : '#F5F7F9';
	const trackColor = isDark ? '#1A2E35' : '#E1E9F5';
	const dividerColor = isDark ? '#333' : '#CBD5E1';
	const footerTextColor = isDark ? '#9BA1A6' : '#475569';

	return (
		<Animated.View style={[styles.container, containerStyle, { backgroundColor }]}>
			<View style={styles.content}>
				{/* Logo Section */}
				<View style={styles.logoContainer}>
					<Image source={require('@/assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
				</View>

				{/* Title */}
				<View style={styles.titleContainer}>
					<ThemedText type="title" style={styles.title}>
						QUẢN LÝ XE
					</ThemedText>
					<ThemedText type="title" style={styles.title}>
						NHÀ TRỌ
					</ThemedText>
				</View>

				{/* Progress Bar */}
				<View style={styles.progressContainer}>
					<ThemedText type="small" style={styles.loadingText}>
						Đang khởi động...
					</ThemedText>
					<View style={[styles.progressBarTrack, { backgroundColor: trackColor }]}>
						<Animated.View style={[styles.progressBarFill, progressBarStyle]} />
					</View>
				</View>
			</View>

			{/* Footer */}
			{/* <View style={styles.footer}>
				<View style={[styles.divider, { backgroundColor: dividerColor }]} />
				<ThemedText type="default" style={[styles.footerText, { color: footerTextColor }]}>
					Dành cho người cao tuổi
				</ThemedText>
			</View> */}
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'space-between',
		zIndex: 9999,
		paddingTop: 100,
		paddingBottom: 50,
	},
	content: {
		alignItems: 'center',
		width: '100%',
	},
	logoContainer: {
		width: 120,
		height: 120,
		marginBottom: 32,
		shadowColor: '#2196F3',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 10,
	},
	logo: {
		width: '100%',
		height: '100%',
		borderRadius: 24,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 60,
	},
	title: {
		fontSize: 32,
		fontWeight: '900',
		color: '#2196F3', // Blue color from design
		lineHeight: 40,
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	progressContainer: {
		width: '70%',
		alignItems: 'center',
	},
	loadingText: {
		color: '#7DA5F8',
		marginBottom: 12,
		fontWeight: '500',
	},
	progressBarTrack: {
		width: '100%',
		height: 8,
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressBarFill: {
		height: '100%',
		backgroundColor: '#2196F3',
		borderRadius: 4,
	},
	footer: {
		alignItems: 'center',
		width: '100%',
	},
	divider: {
		width: 40,
		height: 1,
		marginBottom: 16,
	},
	footerText: {
		fontWeight: '600',
	},
});
