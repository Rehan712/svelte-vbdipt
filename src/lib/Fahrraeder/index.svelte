<script>
	import { onMount } from 'svelte';
	import Filter from '$lib/Fahrraeder/Filter.svelte';
	import Item from '$lib/Item.svelte';
	import res from '$lib/Fahrraeder/test.js';
	import { flip } from 'svelte/animate';

	let items = res[0].data;
	// let items;

	onMount(() => {
		// const endpoint =
		// 	'https://velophil.test/react-service.php?service=cycles&access_token=VMoxiRv9pyrb6MvwMMYAfNbRiU63QcCnREf4R8FVhAazP3RLDt4AGt79PFsJKhhM';
		// fetch(endpoint)
		// 	.then((r) => r.json())
		// 	.then((r) => {
		// 		items = r[0].data;
		// 	});
	});
</script>

<section class="flex flex-col justify-center items-center h-64">
	<h2 class="text-red font-bold text-xl">Fahrräder</h2>
	<p class="flex justify-center items-center text-center w-96 flex-col">
		Hier eine Auswahl der interessantesten Räder, die bei uns zur Probefahrt bereitstehen. Das ist
		aber noch längst nicht alles – besuchen Sie uns im Laden
	</p>
	<div class="justify-center items-center flex mt-8 gap-1">
		<div class="w-3 h-3 bg-red rounded-full" />
		<div class="w-3 h-3 bg-red rounded-full" />
		<div class="w-3 h-3 bg-red rounded-full" />
	</div>
</section>

<Filter {items} let:items={back}>
	{#each back as item (item)}
		<div animate:flip={{ delay: 100, duration: 250 }}>
			<Item {item} />
		</div>
	{:else}
		no Data
	{/each}
</Filter>
