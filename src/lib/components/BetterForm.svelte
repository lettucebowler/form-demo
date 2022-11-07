<script lang="ts">
	import { writable, get, type Writable } from 'svelte/store';
	import { usernameValidation, passwordValidation, emailValidation } from '$lib/validation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import BetterInput from '$lib/components/BetterInput.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';
	import FormHeader from '$lib/components/FormHeader.svelte';

	export let action = '/?default';
	export let form: {
		success: boolean;
		message: string;
		input: {
			username: string;
			password: string;
			email: string;
		};
		validation: {
			email: string;
			password: string;
			username: string;
		};
	};

	$: input = form?.input || {};

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

		return async ({ result, update }) => {
			await applyAction(result);
			await invalidateAll();
			validationState.set({});
			loading = false;
		};
	};

	const handleReset = () => {
		validationState.set({});
		form.message = '';
	};
</script>

<form
	class="box-border grid max-w-md gap-2"
	method="POST"
	use:enhance={enhanceForm}
	bind:this={formElement}
	{action}
	on:reset={handleReset}
>
	<FormHeader message={form?.message} success={form?.success} label="Create an account" />
	<BetterInput
		type="email"
		label="Email *"
		name="email"
		validationFunction={emailValidation}
		validationStore={validationState}
		value={input?.email || ''}
	/>
	<BetterInput
		type="text"
		label="Username *"
		name="username"
		validationFunction={usernameValidation}
		validationStore={validationState}
		value={input?.username || ''}
		helpText="Must be at least 8 characters long. May contain letters, numbers, underscores, periods, dashed, or the @ symbol."
	/>
	<BetterInput
		type="password"
		label="Password *"
		name="password"
		validationFunction={passwordValidation}
		validationStore={validationState}
		value={input?.password || ''}
		helpText="Must be at least 12 characters long."
	/>
	<SubmitButton {loading} />
	<button class="rounded bg-blue-500 p-1 text-lg text-white" type="reset">Reset</button>
</form>
