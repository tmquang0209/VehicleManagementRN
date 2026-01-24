import { SplashScreen as CustomSplashScreen } from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

export const unstable_settings = {
	anchor: '(tabs)',
};

// Prevent the native splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [queryClient] = useState(() => new QueryClient());
	const [isSplashAnimationFinished, setSplashAnimationFinished] = useState(false);

	useEffect(() => {
		if (isSplashAnimationFinished) {
			SplashScreen.hideAsync();
		}
	}, [isSplashAnimationFinished]);

	if (!isSplashAnimationFinished) {
		return (
			<CustomSplashScreen
				onFinish={() => {
					setSplashAnimationFinished(true);
				}}
			/>
		);
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
					<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
				</ThemeProvider>
				<ToastManager />
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
