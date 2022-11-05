<script lang="ts">
	export let value: string = '';
	export let type: string = 'text';
	export let label: string = 'label';
	export let message: string = '';
	export let messageType = 'error';

	let inputElement: HTMLInputElement;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
	const inputId = `input=${type}-${Math.floor(Math.random() * 1000000)}`;

    export let validationFunction = (value: string) => ({message: '', messageType: ''});

    const validateInput = (value: string) => {
        const validationResults = validationFunction(value);
        message = validationResults.message;
        messageType = validationResults.messageType;
        if (!!message && messageType === 'error') {
            value = '';
        }
    }

    const handleBlur = () => {
        validateInput(value);
    }

    $: {
        validateInput(value);
    }

	$: {
		if (message && messageType === 'error' && inputElement) {
			inputElement.focus();
		}
	}
</script>

<div>
	<label for={inputId} class="font-medium block text-lg">{label}</label>
	<input
		use:typeAction
		id={inputId}
		bind:value
		bind:this={inputElement}
        on:blur={handleBlur}
		class="border-solid border-2 rounded p-1 block text-lg"
	/>
	{#if message}
		<span class="text-red-500 text-sm">{message}</span>
	{/if}
</div>
