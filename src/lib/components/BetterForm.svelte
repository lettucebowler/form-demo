<script lang="ts">
	import BetterInput from '$lib/components/BetterInput.svelte';
	import { writable, get } from 'svelte/store';

	const validationErrors = writable({});

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		blurChildren(formElement);

		const formData = new FormData(formElement);

		const values = Object.values(get(validationErrors));
		if (values.some((value) => !!value)) {
			return;
		}

		let data: {
			[x: string]: string;
		} = {};

		for (const [key, value] of formData) {
			console.log(key);
			console.log(value);
			data[key] = value;
		}

		//do something with the data here
	};

	const blurChildren = (formElement: HTMLFormElement) => {
		const children = formElement.querySelectorAll('input');
		for (const input of children) {
			console.log(input);
			input.focus();
			input.blur();
		}
	};

	const usernameValidation = (username: string) => {
		let validationState = {
			message: 'username is required.',
			messageType: 'error'
		};
		if (!username) {
			return validationState;
		}

		validationState.message = '';
		validationState.messageType = '';
		return validationState;
	};

	const passwordValidation = (username: string) => {
		let validationState = {
			message: 'password is required.',
			messageType: 'error'
		};
		if (!username) {
			return validationState;
		}

		validationState.message = '';
		validationState.messageType = '';
		return validationState;
	};

	let formElement: HTMLFormElement;
</script>

<form bind:this={formElement} on:submit={handleSubmit} class="grid gap-2">
	<BetterInput
		type="text"
		label="username"
		validationFunction={usernameValidation}
		validationStore={validationErrors}
	/>
	<BetterInput
		type="password"
		label="password"
		validationFunction={passwordValidation}
		validationStore={validationErrors}
	/>
	<button class="bg-blue-500 rounded text-white text-lg p-1">submit</button>
</form>
