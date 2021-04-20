<script>
	import { writable } from 'svelte/store';
	import { slide, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	export let items = [];
	export let placeholder = '';
	export let selected;
	export let type;
	export let itemsout;
	export let filter;
	export let filterParams;
	export let getNewURL=()=>{}

	let possibilitys = writable({});
	let extended = false;
	let preFilterTemplate = {};

	$: console.log(items);

	$: setPossibilitys(itemsout, filterParams);

	function setPossibilitys(itemsout, e) {
		items.forEach((e) => {
			preFilterTemplate[type] = e;
			$possibilitys[e.slugg] = filter(itemsout, { ...filterParams, ...preFilterTemplate }).length;
		});
	}

</script>

<div
	on:click={() => {
		extended = !extended;
	}}
	class="flex flex-col bg-white text-gray-700 rounded p-2 relative"
>
	<div class="flex justify-between items-center">
		{#if !selected}
			{placeholder} <i class="fas fa-sort-down" />
		{:else}
			{selected.name}
			<i
				class="fas fa-times"
				on:click={() => {
					selected = null;
					goto(getNewURL(), { replaceState: true, noscroll: true });
				}}
			/>
		{/if}
	</div>
	<hr />

	{#if extended}
		<div
			transition:slide
			class="mt-2 md:m-0 md:absolute top-full bg-white left-0 right-0 p-2 md:mt-1 z-20"
		>
			{#each items as item}
				<div
					on:click={() => {
						selected = item;
						goto(getNewURL(), { replaceState: true, noscroll: true });
					}}
					class="flex gap-2"
				>
					{item.name}
					<div transition:fade>({$possibilitys[item.slugg]})</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
