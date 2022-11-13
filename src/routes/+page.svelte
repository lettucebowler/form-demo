<script lang="ts">
	import type { ActionData } from './$types';
	import { writable, get, type Writable } from 'svelte/store';
	import { usernameValidation, passwordValidation, emailValidation } from '$lib/validation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import FormInput from '$lib/components/FormInput.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';
	import FormHeader from '$lib/components/FormHeader.svelte';

	export let form: ActionData;

	const validationState: Writable<{
		[name: string]: string;
	}> = writable({});

	$: {
		validationState.set(form?.validation || {});
	}

	let loading = false;
	let formElement: HTMLFormElement;

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
		return [];
	};

	const enhanceForm: SubmitFunction = ({ cancel }) => {
		validationState.set({});
		if (form) {
			form.message = '';
		}
		const invalidFields = validateLocal(formElement);
		if (invalidFields.length) {
			cancel();
		} else {
			loading = true;
		}

		return async ({ result }) => {
			await applyAction(result);
			await invalidateAll();
			loading = false;
		};
	};
</script>

<form
	class="mx-4 box-border grid max-w-md gap-2"
	method="POST"
	use:enhance={enhanceForm}
	bind:this={formElement}
>
	<FormHeader message={form?.message} success={form?.success} label="Create an account" />
	<FormInput
		type="email"
		label="Email *"
		name="email"
		validationStore={validationState}
		validationFunction={emailValidation}
		value={form?.input?.email || ''}
	/>
	<FormInput
		type="text"
		label="Username *"
		name="username"
		validationStore={validationState}
		validationFunction={usernameValidation}
		value={form?.input?.username || ''}
		helpText="Must be at least 8 characters long. May contain letters, numbers, underscores, periods, dashed, or the @ symbol."
	/>
	<FormInput
		type="password"
		label="Password *"
		name="password"
		validationStore={validationState}
		validationFunction={passwordValidation}
		value={form?.input?.password || ''}
		helpText="Must be at least 12 characters long."
	/>
	<!-- <CheckBox label="I accept terms and conditions." helpText="Please" /> -->
	<SubmitButton {loading} />
</form>
