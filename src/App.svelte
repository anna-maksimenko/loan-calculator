<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import Form from './components/Form.svelte';
	import {getSettings} from './helpers/api-service.js'

	let settingsPromise = getSettings();
</script>

<style type="text/less">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		@apply uppercase;
		color: #ff3e00;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Tailwindcss/>

<main>
	<h1>Hello, I am a loan calculator!</h1>
</main>

{#await settingsPromise}
	<p>Loading</p>
{:then}
	<Form/>
{/await}
