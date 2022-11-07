<script lang="ts">
	import { writable, get, type Writable } from 'svelte/store';
	import { usernameValidation, passwordValidation, emailValidation } from '$lib/validation';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { slide } from 'svelte/transition';
	import BetterInput from '$lib/components/BetterInput.svelte';

	export let action = '/?default';
	export let input: {
		[x: string]: string;
	};
	export let message = '';

	export let validationState: Writable<{
		[x: string]: string;
	}> = writable({});

	let loading = false;

	const validateLocal = (form: HTMLFormElement) => {
		const children = form.querySelectorAll('input');
		for (const input of children) {
			input.focus();
			input.blur();
		}

		const invalidFields = [...Object.entries(get(validationState))].filter((field) => field.at(-1));
		if (invalidFields.length) {
			const [firstInvalid] = invalidFields;
			const invalidElement = form.querySelector(`#input-${firstInvalid.at(0)}`) as HTMLInputElement;
			invalidElement.focus();
			return invalidFields;
		}
		//all fields are valid. Happy!
		return [];
	};

	let formElement: HTMLFormElement;

	const enhanceForm: SubmitFunction = ({ data, action, cancel }) => {
		const invalidFields = validateLocal(formElement);
		if (invalidFields.length) {
			cancel();
		} else {
			loading = true;
		}
	};
</script>

<form
	class="grid max-w-md gap-2"
	method="POST"
	use:enhance={enhanceForm}
	bind:this={formElement}
	{action}
	on:reset={() => validationState.set({})}
>
	<h1 class="mb-4 text-2xl font-medium">Create an account</h1>
	{#if message}
		<p transition:slide={{ duration: 150 }} class="font-medium text-red-500">{message}</p>
	{/if}
	<BetterInput
		type="email"
		label="Email"
		validationFunction={emailValidation}
		validationStore={validationState}
		value={input?.email || ''}
	/>
	<BetterInput
		type="text"
		label="Username"
		validationFunction={usernameValidation}
		validationStore={validationState}
		value={input?.username || ''}
		helpText="Optional. Must be at least 8 characters long. May contain letters, numbers, underscores, periods, dashed, or the @ symbol."
	/>
	<BetterInput
		type="password"
		label="Password"
		validationFunction={passwordValidation}
		validationStore={validationState}
		helpText="Must be at least 12 characters long."
	/>
	<button class="rounded bg-blue-500 p-1 text-lg text-white">submit</button>
	<button class="rounded bg-blue-500 p-1 text-lg text-white" type="reset">Reset</button>
</form>
