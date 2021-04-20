<script>
	import Dropdown from '$lib/Dropdown.svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	export let items = [];

	let filterParams = writable({});
	let itemsout = items;
	let categories = { marken: [], fahrradtypen: [], antriebe: [] };

	Object.prototype.isEmpty = function () {
		for (var key in this) {
			if (this.hasOwnProperty(key)) {
				if (this[key]) {
					return false;
				}
			}
		}
		return true;
	};

	function getCategories(items) {
		let zubehoerarten = [],
			zumarken = [],
			categories = {};
		items.forEach((item) => {
			Object.keys(item.taxonomies).forEach((key) => {
				if (item.taxonomies[key] == 'zubehoerart') {
					if (!zubehoerarten.includes(key)) {
						zubehoerarten.push(key);
					}
				}
				if (item.taxonomies[key] == 'zumarke') {
					if (!zumarken.includes(key)) {
						zumarken.push(key);
					}
				}
			});
		});
		let tempZubehoerarten = [];
		loop1: for (let i = 0; i < zubehoerarten.length; i++) {
			const elementi = zubehoerarten[i];
			for (let j = 0; j < items.length; j++) {
				const elementj = items[j];
				if (elementj.taxonomies_grouped.zubehoerart[elementi]) {
					tempZubehoerarten.push({
						name: elementi,
						slugg: elementj.taxonomies_grouped.zubehoerart[elementi]
					});
					continue loop1;
				}
			}
		}
		categories.zubehoerarten = tempZubehoerarten;

		let tempZumarken = [];
		loop1: for (let i = 0; i < zumarken.length; i++) {
			const elementi = zumarken[i];
			for (let j = 0; j < items.length; j++) {
				const elementj = items[j];
				if (elementj.taxonomies_grouped.zumarke?.[elementi]) {
					tempZumarken.push({
						name: elementi,
						slugg: elementj.taxonomies_grouped.zumarke[elementi]
					});
					continue loop1;
				}
			}
		}
		categories.zumarken = tempZumarken;
		return categories;
	}

	onMount(() => {
		categories = getCategories(items);
		console.log(categories);
		if ($page.params.searchParams) {
			$page.params.searchParams.split('/').forEach((e) => {
				let { zumarken, zubehoerarten } = categories;
				if (
					zumarken.find((i) => {
						return i.slugg === e;
					})
				) {
					$filterParams.zumarke = zumarken.find((i) => {
						return i.slugg === e;
					});
				}
				if (
					zubehoerarten.find((i) => {
						return i.slugg === e;
					})
				) {
					$filterParams.zubehoerart = zubehoerarten.find((i) => {
						return i.slugg === e;
					});
				}
				if (e == 'zuangebot') {
					$filterParams.angebot = true;
				}
			});
		}

		applyFilter($filterParams);
	});

	$: applyFilter($filterParams);

	function applyFilter(filterParams) {
		itemsout = filter(items, filterParams);
	}

	function filter(items, filterParams) {
		if (!filterParams || !items) return items;
		return items
			.filter(
				(bicycle) =>
					!filterParams.zumarke ||
					bicycle.taxonomies_slugged[filterParams.zumarke.slugg] === 'zumarke'
			)
			.filter(
				(bicycle) =>
					!filterParams.zubehoerart ||
					bicycle.taxonomies_slugged[filterParams.zubehoerart.slugg] === 'zubehoerart'
			)
			.filter((bicycle) => !filterParams.angebot || bicycle.taxonomies_grouped.zuangebot);
	}

	function getNewURL() {
		let returnstr = '/';
		if ($filterParams.zumarke) returnstr += `zumarke/${$filterParams.zumarke.slugg}/`;
		if ($filterParams.zubehoerart) returnstr += `zubehoerart/${$filterParams.zubehoerart.slugg}/`;
		if ($filterParams.angebot) returnstr += `zuangebot/angebote-anzeigen/`;
		if ($filterParams.isEmpty()) returnstr += `zubehoer-ersatzteile/`;
		return returnstr;
	}
</script>

<section class="bg-yellow text-white relative p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
	<div>
		Marke
		<Dropdown
			bind:items={categories.zumarken}
			placeholder={'Marke'}
			type={'zumarke'}
			bind:selected={$filterParams.zumarke}
			{itemsout}
			{filter}
			bind:filterParams={$filterParams}
			{getNewURL}
		/>
	</div>
	<div>
		Zubehör Art
		<Dropdown
			bind:items={categories.zubehoerarten}
			placeholder={'Zubehör Art'}
			type={'zubehoerart'}
			bind:selected={$filterParams.zubehoerart}
			{itemsout}
			{filter}
			bind:filterParams={$filterParams}
			{getNewURL}
		/>
	</div>
	<button
		class="bg-red p-4 rounded-full w-full md:col-span-3 lg:col-span-1"
		on:click={() => {
			$filterParams.angebot = !$filterParams.angebot;
			goto(getNewURL(), { replaceState: true, noscroll: true });
		}}
	>
		{#if $filterParams.angebot}
			Alle anzeigen
		{:else}
			{filter(itemsout, { angebot: true }).length} Angebot Anzeigen
		{/if}
	</button>
	{#if !$filterParams.isEmpty()}
		<button
			class="col-span-4 bg-red rounded-full p-3 mx-16"
			on:click={() => {
				$filterParams = {};
				goto(getNewURL(), { replaceState: true, noscroll: true });
			}}>Auswahl zurücksetzen</button
		>
	{/if}
</section>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
	<slot items={itemsout} />
</section>
