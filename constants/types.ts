export interface DashboardStats {
	totalVehicles: number;
	newVehiclesToday: number;
}

export type ActionType = 'SCAN_LICENSE' | 'REGISTER_GUEST';

export interface ActionItem {
	id: string;
	title: string;
	type: ActionType;
	iconName: string; // Icon name from vector-icons
	color: string;
}

export interface ScanResult {
	licensePlate: string;
	isValid: boolean;
	ownerName: string;
	ownerAddress: string;
	timestamp: Date;
}
