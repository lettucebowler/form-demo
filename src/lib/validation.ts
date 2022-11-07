export const usernameValidation = (value: string) => {
	if (!value) {
		return 'Username is required.';
	}
	if (value && value.length < 8) {
		return 'Username must be at least 8 characters.';
	}
	const validCharTest = /[^a-zA-Z0-9@._-]/;
	if (validCharTest.test(value)) {
		return 'Username contains invalid characters.';
	}
	return '';
};

export const passwordValidation = (value: string) => {
	if (!value) {
		return 'Password is required.';
	}
	return value.length < 12 ? 'Invalid password.' : '';
};

export const emailValidation = (value: string) => {
	if (!value) {
		return 'Email is required.';
	}
	const splitAt = value.split('@');
	if (splitAt.length !== 2) {
		return 'Email is invalid';
	}
	const domain = splitAt[1].split('.');
	if (domain.length < 2) {
		return 'Email is invalid';
	}
	return '';
};
