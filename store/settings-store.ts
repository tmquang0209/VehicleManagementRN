import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface SettingsState {
	isLargeText: boolean;
	theme: Theme;
	setLargeText: (enabled: boolean) => void;
	toggleLargeText: () => void;
	setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			isLargeText: false,
			theme: 'light',
			setLargeText: (enabled) => set({ isLargeText: enabled }),
			toggleLargeText: () => set((state) => ({ isLargeText: !state.isLargeText })),
			setTheme: (theme) => set({ theme }),
		}),
		{
			name: 'settings-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
