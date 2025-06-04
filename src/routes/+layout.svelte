<script>
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	
	onMount(async () => {
		if (!browser) return;
		
		// Wait for Svelte to finish rendering
		await tick();
		
		// Wait a bit more for DOM to be stable
		setTimeout(() => {
			if (window.distill) {
				try {
					window.distill.reload();
				} catch (e) {
					// Silently handle any errors
				}
			}
		}, 200);
	});
</script>

<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	
	main {
		min-height: 100vh;
	}
</style>