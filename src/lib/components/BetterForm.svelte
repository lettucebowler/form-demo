<script lang="ts">
	import { writable, get, type Writable } from 'svelte/store';
	import { usernameValidation, passwordValidation, emailValidation } from '$lib/validation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { slide } from 'svelte/transition';
	import BetterInput from '$lib/components/BetterInput.svelte';
	import { invalidateAll } from '$app/navigation';

	export let action = '/?default';
	export let form;

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
		if (form) {
			form.message = '';
		}
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
</script>

<form
	class="mx-2 box-border grid max-w-md gap-2"
	method="POST"
	use:enhance={enhanceForm}
	bind:this={formElement}
	{action}
	on:reset={() => validationState.set({})}
>
	<h1 class="mb-4 text-2xl font-medium">Create an account</h1>
	{#if form?.message}
		<p
			transition:slide={{ duration: 150 }}
			class="text-xl font-medium"
			class:text-red-500={!form?.success}
			class:text-green-500={form?.success}
		>
			{form?.message}
		</p>
	{/if}
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
	<button class="h-9 rounded bg-blue-500 p-1 text-center text-lg text-white">
		{#if loading}
			<svg
				class="mx-auto h-full animate-spin text-center text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{:else}
			submit
		{/if}
	</button>
	<button class="rounded bg-blue-500 p-1 text-lg text-white" type="reset">Reset</button>
</form>
