<script>
	import FahrradFilter from '$lib/Fahrraeder/index.svelte';
	import ZubehoerFilter from '$lib/Zubehoer/index.svelte';
	import { page } from '$app/stores';

	let fahrradKeywords = ['marke', 'fahrradtyp', 'antrieb', 'angebot'];
	let zubehörKeywords = ['zumarke', 'zubehoerart', 'zuangebot'];
	let pageStr = '';
	$page.params.searchParams.split('/').forEach((item) => {
		if (fahrradKeywords.includes(item)) {
			pageStr = 'fahrrad';
		}
		if (zubehörKeywords.includes(item)) {
			pageStr = 'zubehör';
		}
	});
</script>

{#if pageStr === 'fahrrad'}
	<FahrradFilter />
{:else if pageStr === 'zubehör'}
	<ZubehoerFilter />
{/if}
