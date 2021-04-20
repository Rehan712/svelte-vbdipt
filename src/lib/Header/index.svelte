<script>
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	let navExpand = false;
	let windowInnerWidth;
	let search = undefined;
	let searchExpand = false;
	function useSearch(event) {
		if (event.code == 'Enter') {
			goto(`https://velophil.berlin/?s=${search}&submit=Suche`);
		}
	}
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<header>
	<div
		class="bg-header w-full"
		on:click={() => {
			goto('/');
		}}
	>
		<img src="/images/velophil-logo.png" alt="" class="w-4/5 md:w-2/6" />
	</div>
	<div
		on:click={() => {
			navExpand = !navExpand;
		}}
		class="flex justify-center items-center text-xl gap-2 font-bold bg-yellow text-white p-2 lg:hidden"
	>
		{#if navExpand}
			<i class="fas fa-times" />
		{:else}
			<i class="fas fa-bars" />
			<h2 class="">Menu</h2>
		{/if}
	</div>
	{#if navExpand || windowInnerWidth > 1024}
		<nav
			class="flex flex-col md:flex-row bg-yellow text-white justify-evenly items-center p-2 font-sans gap-6 relative"
			transition:slide
		>
			<div
				on:click={() => {
					goto('/fahrraeder');
				}}
			>
				Räder
			</div>
			<div
				on:click={() => {
					goto('/zubehoer-ersatzteile');
				}}
			>
				Zubehör
			</div>
			<div>Service</div>
			<div>Ergonomie</div>
			<div>Aktivitäten</div>
			<div>Galerie</div>
			<div>Über uns</div>
			<div>Kontakt</div>
			<div>Newsletter</div>
			{#if windowInnerWidth < 1024}
				<form on:submit|preventDefault={() => {}}>
					<input
						type="text"
						placeholder="Suche"
						class="p-2 placeholder-gray-600 rounded text-black"
						bind:value={search}
						on:keypress={useSearch}
					/>
				</form>
			{:else}
				<div class="">
					<div
						on:click={() => {
							searchExpand = !searchExpand;
						}}
					>
						<i class="fas fa-search" />
					</div>
					{#if searchExpand}
						<form
							class="absolute right-0 top-0 bottom-0 bg-red px-2 flex gap-2 justify-center items-center"
							transition:fly={{
								delay: 250,
								duration: 300,
								x: 300,
								y: 0,
								opacity: 0.0
							}}
						>
							<input
								type="text"
								placeholder="Suche"
								class="placeholder-gray-50 text-gray-300 bg-red border-b rounded-none shadow-none p-0 border-gray-100"
								bind:value={search}
								on:keypress={useSearch}
							/>
							<i
								class="fas fa-times"
								on:click={() => {
									searchExpand = !searchExpand;
								}}
							/>
						</form>
					{/if}
				</div>
			{/if}
			<div
				on:click={() => {
					navExpand = !navExpand;
				}}
				class="lg:hidden"
			>
				<i class="fas fa-times" />
			</div>
		</nav>
	{/if}
</header>

<style lang="scss">
	nav {
		div {
			@apply cursor-pointer;
		}
	}
</style>
