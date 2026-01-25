export type HouseItem = {
	id: string;
	name: string;
	address: string;
	totalRooms: number;
	status: 'active' | 'inactive' | 'construction';
	imageUri?: string;
};
