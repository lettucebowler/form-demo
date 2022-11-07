<script lang="ts">
	import SimpleInput from '$lib/components/SimpleInput.svelte';

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!username) {
			usernameMessage = 'username is required';
		}
		if (!password) {
			passwordMessage = 'password is required';
		}

		if (usernameMessage || passwordMessage) {
			return;
		}

		const data = {
			username,
			password
		};
		// do something with the data here;
		alert(JSON.stringify(data));
	};

	let usernameMessage = '';
	let passwordMessage = '';

	let username = '';
	let password = '';
</script>

<form on:submit={handleSubmit} class="grid gap-2">
	<SimpleInput type="text" label="username" bind:value={username} message={usernameMessage} />
	<SimpleInput type="password" label="password" bind:value={password} message={passwordMessage} />
	<button class="rounded bg-blue-500 p-1 text-lg text-white">submit</button>
</form>
