<script lang="ts">
	import type { ActionData } from './$types';
	import BetterForm from '$lib/components/BetterForm.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	// import SimpleForm from '$lib/components/SimpleForm.svelte';

	export let form: ActionData;

	$: {
		validationErrors.set(form?.validation || {});
	}

	const validationErrors: Writable<{
		[name: string]: string;
	}> = writable({});

	$: console.log(form);
</script>

<BetterForm validationState={validationErrors} message={form?.message} input={form?.input} />
