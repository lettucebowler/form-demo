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
		alert(`${username}\n${password}`);
	};

	let usernameMessage = '';
	let passwordMessage = '';
	let usernameMessageType = 'error';
	let passwordMessageType = 'error';

	let username = '';
	let password = '';
</script>

<form on:submit={handleSubmit} class="grid gap-2">
	<SimpleInput
		type="text"
		label="username"
		bind:value={username}
		message={usernameMessage}
		messageType={usernameMessageType}
	/>
	<SimpleInput
		type="password"
		label="password"
		bind:value={password}
		message={passwordMessage}
		messageType={passwordMessageType}
	/>
	<button class="bg-blue-500 rounded text-white text-lg p-1">submit</button>
</form>
