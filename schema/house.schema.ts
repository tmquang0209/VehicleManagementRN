import { z } from 'zod';

export const HouseSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên nhà trọ'),
	address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
	manager: z.string().optional(),
	// Room Generation Config
	floors: z
		.string()
		.optional()
		.refine((val) => !val || !isNaN(Number(val)), { message: 'Số tầng phải là số' }),
	roomsPerFloor: z
		.string()
		.optional()
		.refine((val) => !val || !isNaN(Number(val)), { message: 'Số phòng phải là số' }),
	prefix: z.string(),
});

export type HouseFormValues = z.infer<typeof HouseSchema>;
