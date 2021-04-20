<script>
	import Dropdown from '$lib/Dropdown.svelte';
	import Select from 'svelte-select';
	import fetch from "unfetch";
	import { page } from '$app/stores';
	import { onMount } from 'svelte';


	export let  bicycles = [];
	export let handleMarkeChange = () => {};
	export let handleFahrradtypChange = () => {};
	export let handleAntriebChange = () => {};
	export let handleAngebotClick = () => {};
	export let clearFilters = () => {};
	export let extractFiltersFromUrl = () => {};
	export let buildNewUrl  = () => {};

	onMount(() => {
		const endpoint =
			"https://velophil.test/react-service.php?service=cycles&access_token=VMoxiRv9pyrb6MvwMMYAfNbRiU63QcCnREf4R8FVhAazP3RLDt4AGt79PFsJKhhM";
		fetch(endpoint)
			.then(r => r.json())
			.then(r => {
				$: bicycles = r[0].data;
			});
	});

  const handleMarkeChange = (option) => {
    const { history } = props;
    const { fahrradtyp, antrieb, angebot } = extractFiltersFromUrl();
    const marke = option ? option.value : null;
    const newUrl = buildNewUrl({ marke, fahrradtyp, antrieb, angebot });
    history.push(newUrl);
  }
  const handleFahrradtypChange = (option) => {
    const { history } = props;
    const { marke, antrieb, angebot } = extractFiltersFromUrl();
    const fahrradtyp = option ? option.value : null;
    const newUrl = buildNewUrl({ marke, fahrradtyp, antrieb, angebot });
    history.push(newUrl);
  }
  const handleAntriebChange = (option) => {
    const { history } = props;
    const { fahrradtyp, marke, angebot } = extractFiltersFromUrl();
    const antrieb = option ? option.value : null;
    const newUrl = buildNewUrl({ marke, fahrradtyp, antrieb, angebot });
    history.push(newUrl);
  }
  const handleAngebotClick = (event) => {
    event.preventDefault();
    const { history } = props;
    const {
      fahrradtyp,
      marke,
      antrieb,
      angebot
    } = extractFiltersFromUrl();
    const newUrl = buildNewUrl({
      marke,
      fahrradtyp,
      antrieb,
      angebot: !angebot
    });
    history.push(newUrl);
  }
  const extractFiltersFromUrl = () => {
    const {
      property1,
      property2,
      property3,
      property4,
      value1,
      value2,
      value3,
      value4
    } = props.match.params;
    return {
      ...(property1 && { [property1]: value1 }),
      ...(property2 && { [property2]: value2 }),
      ...(property3 && { [property3]: value3 }),
      ...(property4 && { [property4]: value4 })
    };
  }
  const buildNewUrl = ({ marke, fahrradtyp, antrieb, angebot }) => {
    let newUrl = "/";
    if (marke) {
      newUrl += `marke/${marke}/`;
    }
    if (fahrradtyp) {
      newUrl += `fahrradtyp/${fahrradtyp}/`;
    }
    if (antrieb) {
      newUrl += `antrieb/${antrieb}/`;
    }
    if (angebot) {
      newUrl += "angebot/angebote-anzeigen/";
    }
    return newUrl;
  }
  const filterBicycles = (excludedFilter) => {
    const { bicycles } = store;
    const {
      marke,
      fahrradtyp,
      antrieb,
      angebot
    } = extractFiltersFromUrl();
    return bicycles
      .filter(
        bicycle =>
          !marke ||
          bicycle.taxonomies_slugged[marke] === "marke" ||
          excludedFilter === "marke"
      )
      .filter(
        bicycle =>
          !fahrradtyp ||
          bicycle.taxonomies_slugged[fahrradtyp] === "fahrradtyp" ||
          excludedFilter === "fahrradtyp"
      )
      .filter(
        bicycle =>
          !antrieb ||
          bicycle.taxonomies_slugged[antrieb] === "antrieb" ||
          excludedFilter === "antrieb"
      )
      .filter(
        bicycle =>
          !angebot || bicycle.taxonomies["Angebote anzeigen"] === "angebot"
      );
  }
  const subFilter = (bicycles, what, filter_name) => {
    return bicycles.filter(bicycle => bicycle.taxonomies[what] === filter_name);
  }
  const any = (bicycles) => {
    return bicycles.length > 0;
  }
  const clearFilters = (event) => {
    event.preventDefault();
    const { history } = props;
    history.push("/");
  }
  const getFilterValueNumbers = (filter) => {
    const bicycles = filterBicycles(filter);
    const filterValueNumbers = {};
    bicycles.forEach(bicycle => {
      const filterValues = Object.keys(bicycle.taxonomies_slugged).filter(
        value => bicycle.taxonomies_slugged[value] === filter
      );
      filterValues.forEach(value => {
        if (filterValueNumbers[value]) {
          filterValueNumbers[value].amount += 1;
        } else {
          filterValueNumbers[value] = {
            amount: 1,
            properName: bicycle.taxonomies_named_slugged[value]
          };
        }
      });
    });
    return filterValueNumbers;
  }
	const computeOptions = (filter) => {
    const filterValueNumbers = getFilterValueNumbers(filter);
    return Object.keys(filterValueNumbers).map(value => ({
      value,
      label: `${filterValueNumbers[value].properName} (${
        filterValueNumbers[value].amount
      })`
    }));
  }

	const {
		marke,
		fahrradtyp,
		antrieb,
		angebot
	} = extractFiltersFromUrl();

	const filteredBicycles = filterBicycles();
	const angeboteBicycles = subFilter(
		filteredBicycles,
		"Angebote anzeigen",
		"angebot"
	);
	const angeboteCounted = angeboteBicycles.length;
	const anyAngebote = any(angeboteBicycles);
	const markeOptions = computeOptions("marke");
	const fahrradtypOptions = computeOptions("fahrradtyp");
	const antriebOptions = computeOptions("antrieb");
	const any_options = !!(marke || fahrradtyp || antrieb);
	const selectbox_styles_filter_option_on = {
		backgroundColor: "rgb(243, 239, 239)"
	};
	const selectbox_styles_filter_option_off = {
		backgroundColor: "rgb(255, 255, 255)"
	};
</script>

<div
	class="beautiful-taxonomy-filters select2-active"
	id="beautiful-taxonomy-filters-fahrrad"
>
	<form
		class="bicycle-filters clearfix filter-count-1"
		id="beautiful-taxonomy-filters-form"
	>
		<div class="beautiful-taxonomy-filters-select-wrap clearfix">
			<div
				class="beautiful-taxonomy-filters-tax filter-count-4"
				id="beautiful-taxonomy-filters-tax-marke"
			>
				<label
					for="select-marke"
					class="beautiful-taxonomy-filters-label"
				>
					Marke
				</label>
				<Select
					name="select-marke"
					id="select-marke"
					options={markeOptions}
					on:change={handleMarkeChange}
					bind:value={marke}
					style={
                    marke
                      ? selectbox_styles_filter_option_on
                      : selectbox_styles_filter_option_off
                  }
					placeholder={"Marke".concat(
                    bicycles.length ? "" : " (Wird geladen)"
                  )}
					class="select-box beautiful-taxonomy-filters-select"
				/>
			</div>

			<div
				class="beautiful-taxonomy-filters-tax filter-count-4"
				id="beautiful-taxonomy-filters-tax-fahrradtyp"
			>
				<label
					for="select-fahrradtyp"
					class="beautiful-taxonomy-filters-label"
				>
					Fahrradtyp
				</label>
				<Select
					name="select-fahrradtyp"
					id="select-fahrradtyp"
					options={fahrradtypOptions}
					on:change={handleFahrradtypChange}
					bind:value={fahrradtyp}
					style={
                    fahrradtyp
                      ? selectbox_styles_filter_option_on
                      : selectbox_styles_filter_option_off
                  }
					placeholder={"Fahrradtyp".concat(
                    bicycles.length ? "" : " (Wird geladen)"
                  )}
					class="select-box beautiful-taxonomy-filters-select"
				/>
			</div>

			<div
				class="beautiful-taxonomy-filters-tax filter-count-4"
				id="beautiful-taxonomy-filters-tax-antrieb"
			>
				<label
					for="select-antrieb"
					class="beautiful-taxonomy-filters-label"
				>
					Antrieb
				</label>
				<Select
					name="select-antrieb"
					id="select-antrieb"
					options={antriebOptions}
					on:change={handleAntriebChange}
					bind:value={antrieb}
					style={
                    antrieb
                      ? selectbox_styles_filter_option_on
                      : selectbox_styles_filter_option_off
                  }
					placeholder={"Antrieb".concat(
                    bicycles.length ? "" : " (Wird geladen)"
                  )}
					class="select-box  beautiful-taxonomy-filters-select"
				/>
			</div>

			<div class="beautiful-taxonomy-filters-tax filter-count-4">
				{anyAngebote ? (
					<button
						style={
							angebot
								? {
									overflow: "hidden",
									color: "rgb(255, 255, 255)",
									backgroundColor: "rgb(197, 26, 27)"
								}
								: {
									overflow: "hidden",
									color: "rgb(255, 255, 255)",
									backgroundColor: "rgb(197, 26, 27)"
								}
						}
						class="beautiful-taxonomy-filters-button slidedown"
						on:click={handleAngebotClick}
						title="Klicken, um alle Angebot Filter aufzuheben"
					>
						{angebot
							? "Alle anzeigen"
							: angeboteCounted +
							(angeboteCounted === 1
								? " Angebot anzeigen"
								: " Angebote anzeigen")}
					</button>
				) : (
					<button
						style={{
							cursor: "default",
							height: "43px",
							color: "rgb(249, 187, 0)",
							backgroundColor: "rgb(249, 187, 0)"
						}}
						disabled="disabled"
						class="beautiful-taxonomy-filters-button slidedown"
					/>
				)}
			</div>
		</div>
		<div class="clearfix">
			{any_options ? (
				<button
					style={{ cursor: "pointer" }}
					class="clear-offers-button slidedown"
					on:click={clearFilters}
					title="Klicken, um alle aktiven Filter aufzuheben"
				>
					Auswahl zurücksetzen
				</button>
			) : (
				<button
					style={{
						cursor: "default",
						color: "rgb(249, 187, 0)",
						backgroundColor: "rgb(249, 187, 0)"
					}}
					class="clear-offers-button slidedown"
					disabled="disabled"
				/>
			)}
		</div>
	</form>
</div>

