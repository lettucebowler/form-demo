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
			class="text-xl font-medium"
			class:text-red-500={!success}
			class:text-green-500={success}
		>
			{message}
		</p>
	{/if}
</div>
