import { z } from 'zod';

export const RoomSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên/số phòng'),
	floor: z
		.string()
		.min(1, 'Vui lòng nhập tầng')
		.refine((val) => !isNaN(Number(val)), { message: 'Tầng phải là số' }),
	price: z.string().optional(),
	area: z.string().optional(),
	status: z.enum(['empty', 'occupied', 'maintenance']),
});

export type RoomFormValues = z.infer<typeof RoomSchema>;
