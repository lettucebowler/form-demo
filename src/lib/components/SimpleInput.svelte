<script lang="ts">
	export let value: string = '';
	export let type: string = 'text';
	export let label: string = 'label';
	export let message: string = '';

	let inputElement: HTMLInputElement;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
	const inputId = `input=${type}-${Math.floor(Math.random() * 1000000)}`;

	$: {
		if (message && inputElement) {
			inputElement.focus();
		}
	}
</script>

<div>
	<label for={inputId} class="block text-lg font-medium">{label}</label>
	<input
		use:typeAction
		id={inputId}
		bind:value
		bind:this={inputElement}
		class="block rounded border-2 border-solid p-1 text-lg"
	/>
	{#if message}
		<span class="text-sm text-red-500">{message}</span>
	{/if}
</div>
