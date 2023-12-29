<!-- 
	* This is a test page to see if the client side data fetching works 
	* And it refresh the token when it expires or if the server responds with a 403
 -->

<script>
	import axios from '$lib/axios/axiosClient';
	let data = '';

	const test = async function () {
		data = await axios.get(''); // your api endpoint that needs authentication
	};
</script>

<button on:click={test}>Click me</button>

<h1>{JSON.stringify(data ?? '')}: session</h1>
