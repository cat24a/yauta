<!--
    YAUTA (a todo app)
    Copyright (C) 2024  cat24a

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script>
	import { onDestroy, onMount } from "svelte";
	import Settings from "./Settings.js";
	import { getGems } from "./gems.js";
	let gemcount = "loading";
	function update() {
		if ($Settings.gem_url)
			// @ts-ignore
			getGems().then(amount => (gemcount = amount));
	}
	let interval = 0;
	onMount(() => {
		interval = setInterval(update, 10000);
		update();
	});
	onDestroy(() => clearInterval(interval));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="main" on:click={update}>
	<i class="fa-regular fa-gem"></i>
	<span id="count">
		{$Settings.gem_url ? gemcount : $Settings.gem_amount}
	</span>
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
