import { useSettingsStore } from '@/store/settings-store';

export function useColorScheme(): 'light' | 'dark' {
	const theme = useSettingsStore((state) => state.theme);
	return theme;
}
