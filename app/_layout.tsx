import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

export const unstable_settings = {
	anchor: '(tabs)',
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [queryClient] = useState(() => new QueryClient());

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
