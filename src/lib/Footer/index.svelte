<script>
</script>

<footer class="pb-16">
	<div class="bg-yellow font-bold p-4 pb-8 relative">
		<div class="w-1/2 grid grid-cols-1 gap-8 leading-4 text-base">
			<address class=" flex flex-col">
				<h3 class="text-red mb-3">velophil Fahrradhandel GmbH</h3>
				<span>Alt-Moabit</span>
				<span class="mb-3">72 10555 Berlin</span>
				<span>030 399 02 116</span>
			</address>

			<div class="flex flex-col">
				<h3 class="text-red mb-3">Öffnungszeiten Verkauf:</h3>
				<span>Mo. bis Fr. 14 – 19 Uhr </span>
				<span> Samstag 10 – 16 Uhr </span>
			</div>
			<div>
				<a href="mailto:team@velophil.de">team@velophil.de</a>
				<a href="mailto:werkstatt@velophil.de">werkstatt@velophil.de</a>
			</div>
			<div class="flex flex-col">
				<h3 class="text-red mb-3">Öffnungszeiten Werkstatt:</h3>
				<span> Mo. bis Fr. 9 - 19 Uhr </span>
				<span> Samstag 10 - 16 Uhr </span>
			</div>
			<div class="md:col-span-2 text-6xl whitespace-nowrap">
				<a
					href="https://www.google.de/maps/place/Velophil+GmbH/@52.52391,13.3302313,17z/data=!3m1!4b1!4m2!3m1!1s0x47a8510e08e762d3:0xf3d873ccf112f36"
					><i class="fas fa-map-marker-alt" /></a
				>
				<a href="https://www.youtube.com/channel/UCxjoKSInOd-yHfhvEfLLYvQ">
					<i class="fab fa-youtube" />
				</a>
				<a href="https://www.facebook.com/Fahrradhandel.velophil"
					><i class="fab fa-facebook-square" /></a
				>
				<a href="https://www.instagram.com/velophil_berlin/"><i class="fab fa-instagram" /></a>
				<a href="https://www.pinterest.com/velophil_berlin/">
					<i class="fab fa-pinterest-square" /></a
				>
			</div>
		</div>

		<img src="/images/icon_vsf.png" alt="" class="absolute bg-white right-0 -bottom-4 p-4 w-48" />
	</div>
	<div
		class="relative flex justify-center items-center flex-col p-4 text-sm md:justify-start md:items-start"
	>
		<div
			class="absolute right-8 text-2xl top-1/3"
			on:click={() => {
				document.body.scrollIntoView({ behavior: 'smooth' });
			}}
		>
			<i class="fas fa-sort-up my-4" />
		</div>
		<h4 class="text-base mb-4">Impressum & Datenschutz</h4>
		<span class="text-center">
			Unsere Website verwendet Cookies und das Webanalyse-Tool Piwik. Mit der Nutzung unserer
			Website, erklären Sie sich damit einverstanden.
		</span>
		<a href="https://velophil.berlin/impressum/" class="underline mb-4">
			Sie können hier der Nutzung widersprechen.
		</a>
		<span> Preisangaben inkl. gesetzl. MwSt., Irrtum vorbehalten </span>
		<span> © 2016-2021 velophil Fahrradhandel GmbH – Alle Rechte vorbehalten </span>
	</div>
</footer>

<style>
	span,
	a {
		@apply text-gray-900;
	}
</style>
