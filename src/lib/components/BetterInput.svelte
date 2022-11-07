<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let value: string = '';
	export let type: string = 'text';
	export let label: string = 'label';
	export let name = label.toLowerCase();
	export let helpText = '';
	export let validationStore: Writable<{
		[x: string]: string;
	}> = writable({});

	let inputElement: HTMLInputElement;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
	const inputId = `input-${name}`;

	export let validationFunction = (value: string) => '';

	const validateInput = () => {
		const message = validationFunction(value);
		$validationStore[name] = message;
	};

	const handleBlur = () => {
		validateInput();
	};

	$: error = $validationStore[name];
</script>

<label for={inputId} class="flex flex-col text-lg font-medium">
	{label}
	<input
		use:typeAction
		data-invalid={error ? true : undefined}
		id={inputId}
		bind:value
		{name}
		bind:this={inputElement}
		on:blur={handleBlur}
		class="block rounded border-2 border-solid p-1 text-lg"
	/>
	{#if helpText}
		<p class="text-sm text-gray-500">{helpText}</p>
	{/if}
	{#if error}
		<p transition:slide={{ duration: 150 }} class="text-sm text-red-500">{error}</p>
	{/if}
</label>
