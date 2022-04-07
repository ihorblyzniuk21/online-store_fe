import * as yup from "yup"

export const registerValidationSchema = yup.object({
	name: yup
		.string('Enter your name')
		.min(2, 'should be of minimum 2 characters length')
		.max(20, 'should be of maximum 20 characters length')
		.required(),
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(5, 'Password should be of minimum 5 characters length')
		.max(50, 'should be of maximum 50 characters length')
		.required('Password is required'),
});

export const loginValidationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(5, 'Password should be of minimum 5 characters length')
		.max(50, 'should be of maximum 50 characters length')
		.required('Password is required'),
});

export const typeBrandValidationSchema = yup.object({
	name: yup
		.string('Enter name')
		.required('Name is required')
		.min(2, 'Name should be of minimum 2 characters length')
		.max(25, 'Name should be of maximum 25 character length')
})

export const deviceValidationSchema = yup.object({
	name: yup
		.string('Enter name')
		.required('Name is required')
		.min(2, 'Name should be of minimum 2 characters length')
		.max(25, 'Name should be of maximum 25 character length'),
	typeId: yup
		.number('typeId should be a number')
		.required('type is required'),
	brandId: yup
		.number('brandId should be a number')
		.required('brand is required'),
	price: yup
		.number('brandId should be a number')
		.required('brand is required'),
})