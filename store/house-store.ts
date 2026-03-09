import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface House {
	id: string;
	name: string;
	address: string;
	totalRooms: number;
	occupiedRooms: number;
	totalVehicles: number;
}

export const MOCK_HOUSES: House[] = [
	{
		id: 'house_1',
		name: 'Trọ số 1',
		address: 'Số 12 Ngõ 34, Cầu Giấy, Hà Nội',
		totalRooms: 15,
		occupiedRooms: 12,
		totalVehicles: 23,
	},
	{
		id: 'house_2',
		name: 'Trọ số 2',
		address: 'Số 45 Ngõ 67, Đống Đa, Hà Nội',
		totalRooms: 30,
		occupiedRooms: 26,
		totalVehicles: 45,
	},
	{
		id: 'house_3',
		name: 'Trọ số 3',
		address: 'Số 89 Ngõ 10, Thanh Xuân, Hà Nội',
		totalRooms: 10,
		occupiedRooms: 5,
		totalVehicles: 7,
	},
];

interface HouseState {
	houses: House[];
	selectedHouseId: string | null;
	setSelectedHouse: (id: string) => void;
	addHouse: (house: House) => void;
	getSelectedHouse: () => House | undefined;
}

export const useHouseStore = create<HouseState>()(
	persist(
		(set, get) => ({
			houses: MOCK_HOUSES,
			selectedHouseId: MOCK_HOUSES[0].id, // Default to first house
			setSelectedHouse: (id) => set({ selectedHouseId: id }),
			addHouse: (house) => set((state) => ({ houses: [...state.houses, house] })),
			getSelectedHouse: () => {
				const { houses, selectedHouseId } = get();
				return houses.find((h) => h.id === selectedHouseId);
			},
		}),
		{
			name: 'house-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
