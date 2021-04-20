<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	let hover = false;
	export let item;
</script>

<article
	on:click={() => {
		goto(item.link);
	}}
	class="relative cursor-pointer h-full overflow-hidden"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
>
	<div>
<!--		<img src="https://dummyimage.com/400x300/222/999.png?text=Test" alt="" class="w-full" />-->
		 <img src={item.file} alt="" />
	</div>
	<div
		class="h-full relative p-2"
		style="background: url(/images/velo-verlauf.png); background-repeat: no-repeat;
		background-size: cover;"
	>
		<h3 class="text-red font-bold text-lg">{@html item.title}</h3>
		<p class="">
			{@html item.text}
		</p>
	</div>

	{#if hover}
		<div class="absolute bottom-2 right-0 px-2 rounded-full bg-red text-white z-10" transition:fade>
			Mehr
		</div>
	{/if}
</article>

<style>
	article:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		height: 4rem;
		width: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0), #f1ede3);
		z-index: 0;
	}
</style>
