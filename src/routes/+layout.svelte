<script>
	import '../app.css';
	export let data;
	let session = data.session;

	const handleLogout = async () => {
		await fetch('/api/logout', { cache: 'no-cache' });
		location.reload();
	};
</script>

<nav class="bg-gray-800 text-white p-4">
	<div class="container mx-auto flex justify-between items-center">
		<a href="/" class="text-xl font-semibold">Demo</a>
		{#if session}
			<div class="">
				<a href="/login" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Profile</a>
				<button on:click={handleLogout} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
					>Logout</button
				>
			</div>
		{:else}
			<div class="">
				<a href="/login" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Login</a>
				<a href="/register" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Register</a>
			</div>
		{/if}
	</div>
</nav>

<slot />
