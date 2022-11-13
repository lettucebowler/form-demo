<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let label = 'label';
	export const name = label;
	export let helpText = '';
	export let validationStore: Writable<{
		[x: string]: string;
	}> = writable({});
	export let validationFunction = (value: string) => '';

	let value = false;
	let inputElement: HTMLInputElement;

	// @ts-ignore
	const uuidv4 = () =>
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
		);

	const id = uuidv4();

	const handleBlur = () => {
		const message = validationFunction(inputElement.value);
		$validationStore[name] = message;
	};

	const handleInput = () => {
		value = inputElement.value === 'true' || false;
	};

	$: error = $validationStore[name];
</script>

<label class="ml-auto mr-2">
	<span class="text-sm font-medium">{label}</span>
	<input
		type="checkbox"
		{id}
		{name}
		bind:value
		bind:this={inputElement}
		on:blur={handleBlur}
		on:input={handleInput}
	/>
	{#if helpText}
		<p class="text-right text-sm text-gray-500">{helpText}</p>
	{/if}
	{#if error}
		<p transition:slide={{ duration: 150 }} class="text-right text-sm text-red-500">{error}</p>
	{/if}
</label>
