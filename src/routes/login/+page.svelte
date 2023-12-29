<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form action="?/login" method="POST" class="mt-12 w-full max-w-xs mx-auto">
	<input
		name="username"
		type="text"
		placeholder="username"
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	/>
	<input
		name="password"
		type="password"
		placeholder="password"
		class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	/>
	<button
		type="submit"
		class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		>Login</button
	>
</form>

{#if form?.body.success === false}
	<p class="error">You have entered the wrong credentials.</p>
{/if}
