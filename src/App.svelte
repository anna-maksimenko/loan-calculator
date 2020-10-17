<script>
	import axios from 'axios';

	import {loanSettings} from './globals.js';
	import Tailwindcss from './Tailwindcss.svelte';
	import Form from './components/Form.svelte';

	let settingsPromise = getSettings();
	 
	async function getSettings(){
		const request = await axios({
			url: '/api/settings',
			method: 'get'
		})

		const response = await request;

		$loanSettings = response.data;

 		if (response.status === 200 && response.hasOwnProperty('data') && !response.data.hasOwnProperty('error')) {
			return $loanSettings
		} else {
			throw new Error((response.hasOwnProperty('data') && response.data.hasOwnProperty('error')) ? response.data.error : 'Request error');
		} 
	}

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
