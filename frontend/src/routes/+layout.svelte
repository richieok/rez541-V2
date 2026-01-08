<script>
	import favicon from "$lib/assets/favicon.svg";
	import "$lib/styles/reset.css";
	import "$lib/styles/global.css";
	import Nav from "./Nav.svelte";
	import Footer from "./Footer.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<Footer />

<style>
	main {
		container-type: inline-size;
	}
</style>
