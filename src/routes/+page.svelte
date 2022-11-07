<script lang="ts">
	import type { ActionData } from './$types';
	import BetterForm from '$lib/components/BetterForm.svelte';
	import { writable, type Writable } from 'svelte/store';

	export let form: ActionData;

	$: {
		validationErrors.set(form?.validation || {});
	}

	const validationErrors: Writable<{
		[name: string]: string;
	}> = writable({});
</script>

<BetterForm validationState={validationErrors} {form} />
