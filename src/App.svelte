<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import PaybackLayout from './components/PaybackLayout.svelte';
	import {getSettings} from './helpers/api-service.js'

	let settingsPromise = getSettings();
</script>

<style type="text/less">
	main {
		@apply text-center p-4;
	}

	h1 {
		@apply uppercase text-purple-500 text-2xl tracking-wide font-thin;
	}
</style>

<Tailwindcss/>

<main>
	<h1>Hello, I am a loan calculator!</h1>
	{#await settingsPromise}
		<p>Loading</p>
	{:then}
		<PaybackLayout/>
	{/await}
</main>


