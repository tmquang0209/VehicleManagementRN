import { z } from 'zod';

// Vietnam phone number regex: Starts with 0, followed by 9 digits
const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

export const loginSchema = z.object({
	phoneNumber: z.string().min(1, 'Vui lòng nhập số điện thoại').regex(phoneRegex, 'Số điện thoại không hợp lệ'),
	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const signupSchema = z
	.object({
		fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự').max(50, 'Họ và tên quá dài'),
		phoneNumber: z.string().min(1, 'Vui lòng nhập số điện thoại').regex(phoneRegex, 'Số điện thoại không hợp lệ'),
		password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
		confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Mật khẩu không khớp',
		path: ['confirmPassword'],
	});

export const forgotPasswordSchema = z.object({
	phoneNumber: z.string().min(1, 'Vui lòng nhập số điện thoại').regex(phoneRegex, 'Số điện thoại không hợp lệ'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
