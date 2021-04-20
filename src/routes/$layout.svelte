<script>
	import '../app.scss';
	import Header from '$lib/Header/index.svelte';
	import Footer from '$lib/Footer/index.svelte';
</script>

<div class="md:p-4 xl:w-4/5 xl:mx-auto">
	<Header />

	<slot />

	<Footer />
</div>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
