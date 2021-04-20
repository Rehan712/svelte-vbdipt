<script>
	import Dropdown from '$lib/Dropdown.svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	export let items = [];

	let filterParams = writable({});
	let itemsout = items;
	let categorys = { marken: [], fahrradtypen: [], antriebe: [] };

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

	function getCategorys(items) {
		let antriebe = [],
			fahrradtypen = [],
			marken = [];
		categorys = {};
		items.forEach((item) => {
			Object.keys(item.taxonomies).forEach((key) => {
				if (item.taxonomies[key] === 'antrieb') {
					if (!antriebe.includes(key)) {
						antriebe.push(key);
					}
				}
				if (item.taxonomies[key] === 'marke') {
					if (!marken.includes(key)) {
						marken.push(key);
					}
				}
				if (item.taxonomies[key] === 'fahrradtyp') {
					if (!fahrradtypen.includes(key)) {
						fahrradtypen.push(key);
					}
				}
			});
		});
		let tempAntriebe = [];
		loop1: for (let i = 0; i < antriebe.length; i++) {
			const elementi = antriebe[i];

			loop2: for (let j = 0; j < items.length; j++) {
				const elementj = items[j];

				if (elementj.taxonomies_grouped.antrieb[elementi]) {
					tempAntriebe.push({
						name: elementi,
						slugg: elementj.taxonomies_grouped.antrieb[elementi]
					});
					continue loop1;
				}
			}
		}
		categorys.antriebe = tempAntriebe;

		let tempType = [];
		loop1: for (let i = 0; i < fahrradtypen.length; i++) {
			const elementi = fahrradtypen[i];

			loop2: for (let j = 0; j < items.length; j++) {
				const elementj = items[j];

				if (elementj.taxonomies_grouped.fahrradtyp[elementi]) {
					tempType.push({
						name: elementi,
						slugg: elementj.taxonomies_grouped.fahrradtyp[elementi]
					});
					continue loop1;
				}
			}
		}
		categorys.fahrradtypen = tempType;

		let tempMarke = [];
		loop1: for (let i = 0; i < marken.length; i++) {
			const elementi = marken[i];

			loop2: for (let j = 0; j < items.length; j++) {
				const elementj = items[j];

				if (elementj.taxonomies_grouped.marke[elementi]) {
					tempMarke.push({
						name: elementi,
						slugg: elementj.taxonomies_grouped.marke[elementi]
					});
					continue loop1;
				}
			}
		}
		categorys.marken = tempMarke;
		return categorys;
	}

	onMount(() => {
		categorys = getCategorys(items);
		if ($page.params.searchParams) {
			$page.params.searchParams.split('/').forEach((e) => {
				let { marken, fahrradtypen, antriebe } = categorys;
				if (
					marken.find((i) => {
						return i.slugg === e;
					})
				) {
					$filterParams.marke = marken.find((i) => {
						return i.slugg === e;
					});
				}
				if (
					fahrradtypen.find((i) => {
						return i.slugg === e;
					})
				) {
					$filterParams.type = fahrradtypen.find((i) => {
						return i.slugg === e;
					});
				}
				if (
					antriebe.find((i) => {
						return i.slugg === e;
					})
				) {
					$filterParams.antrieb = antriebe.find((i) => {
						return i.slugg === e;
					});
				}
				if (e == 'angebot') {
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
					!filterParams.marke || bicycle.taxonomies_slugged[filterParams.marke.slugg] === 'marke'
			)
			.filter(
				(bicycle) =>
					!filterParams.type || bicycle.taxonomies_slugged[filterParams.type.slugg] === 'fahrradtyp'
			)
			.filter(
				(bicycle) =>
					!filterParams.antrieb ||
					bicycle.taxonomies_slugged[filterParams.antrieb.slugg] === 'antrieb'
			)
			.filter((bicycle) => !filterParams.angebot || bicycle.taxonomies_grouped.angebot);
	}

	function getNewURL() {
		let returnstr = '/';
		if ($filterParams.marke) returnstr += `marke/${$filterParams.marke.slugg}/`;
		if ($filterParams.type) returnstr += `fahrradtyp/${$filterParams.type.slugg}/`;
		if ($filterParams.antrieb) returnstr += `antrieb/${$filterParams.antrieb.slugg}/`;
		if ($filterParams.angebot) returnstr += `angebot/angebote-anzeigen/`;
		if ($filterParams.isEmpty()) returnstr += `fahrraeder/`;
		return returnstr;
	}
</script>

<section
	class="bg-yellow text-white relative p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
>
	<div>
		Marke
		<Dropdown
			bind:items={categorys.marken}
			placeholder={'Marke'}
			type={'marke'}
			bind:selected={$filterParams.marke}
			{itemsout}
			{filter}
			bind:filterParams={$filterParams}
			{getNewURL}
		/>
	</div>
	<div>
		Fahrradtyp
		<Dropdown
			bind:items={categorys.fahrradtypen}
			placeholder={'Fahrradtyp'}
			type={'type'}
			bind:selected={$filterParams.type}
			{itemsout}
			{filter}
			bind:filterParams={$filterParams}
			{getNewURL}
		/>
	</div>
	<div>
		Antrieb
		<Dropdown
			bind:items={categorys.antriebe}
			placeholder={'Antrieb'}
			type={'antrieb'}
			bind:selected={$filterParams.antrieb}
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
