<script>
	import Settings from "./Settings.js";
	import { getGems } from "./gems.js";
	let gemcount = "loading";
	function update() {
		// @ts-ignore
		getGems().then(amount => (gemcount = amount));
	}
	setInterval(update, 10000);
	update();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="main" on:click={update}>
	<i class="fa-regular fa-gem"></i>
	<span id="count">{gemcount}</span>
</div>

<style>
	#main {
		margin: 0.5rem;
		display: flex;
		align-items: center;
	}

	#count {
		display: inline-block;
		font-size: 1rem;
		margin-left: 0.5rem;
	}
</style>
