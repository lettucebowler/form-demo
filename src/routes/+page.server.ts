import type { Actions } from './$types';
import { usernameValidation, passwordValidation, emailValidation } from '$lib/validation';
import { invalid } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const metadata = {
			success: false,
			message: '',
			input: {
				username: '',
				email: '',
				password: ''
			},
			validation: {
				username: '',
				password: '',
				email: ''
			}
		};
		const data = await event.request.formData();

		const username = data.get('username')?.toString() || '';
		metadata.validation.username = usernameValidation(username);
		metadata.input.username = username;

		const password = data.get('password')?.toString() || '';
		metadata.validation.password = passwordValidation(password);
		// Don't send back password because security or something.

		const email = data.get('email')?.toString() || '';
		metadata.validation.email = emailValidation(email);
		metadata.input.email = email;

		if (Object.values(metadata.validation).filter(Boolean).length) {
			metadata.message = 'Invalid form data. please correct any displayed errors.';
			return invalid(400, metadata);
		}
		metadata.success = true;
		return metadata;
	}
};
