<script lang="ts">
	import { slide } from 'svelte/transition';

	export let message: string = '';
	export let success: boolean = false;
	export let label: string = 'Form Header';
</script>

<div>
	<h1 class="mb-4 text-2xl font-medium">{label}</h1>
	{#if message}
		<p
			transition:slide={{ duration: 150 }}
			class="text-md rounded border-2 border-solid p-2 font-medium text-gray-500"
			class:border-red-300={!success}
			class:border-green-300={success}
		>
			{message}
		</p>
	{/if}
</div>
