<script>
	// "?v=2 forces browsers to download a new version of favicon"
	import favicon from "$lib/assets/favicon.svg?v=2";
	import "$lib/styles/reset.css";
	import "$lib/styles/global.css";
	import Nav from "./Nav.svelte";
	// import Footer from "./Footer.svelte";
	import Footer2 from "./Footer2.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<!-- <Footer /> -->
<Footer2 />

<style>
	main {
		container-type: inline-size;
	}
</style>
