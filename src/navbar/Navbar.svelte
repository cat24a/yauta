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
	import { createEventDispatcher } from "svelte";

	import Settings from "../Settings";
	import { done } from "../account";

	import GemDisplay from "./GemDisplay.svelte";

	const dispatchEvent = createEventDispatcher();

	export let settingsopen = false;
</script>

<nav>
	<span id="logo">
		YAUTA {#if $Settings.dogmode}dog mode{/if}
	</span>

	{#if $Settings.general_showsavingstate && !$done}
		<div><i class="fa-solid fa-spinner fa-spin"></i></div>
	{/if}

	{#if $Settings.gem_enable}
		<GemDisplay />
	{/if}

	<a
		href="https://github.com/cat24a/yauta/issues"
		target="_blank"
		rel="noopener noreferrer"
	>
		<i class="fa-brands fa-github"></i>
	</a>
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a
		href="#"
		on:click={() => {
			dispatchEvent("settingsui-toggle");
		}}
		id="settings-button"
		class:activated={settingsopen}><i class="fa-solid fa-gear"></i></a
	>
</nav>

<style>
	nav {
		background-color: #1199ff;
		font-size: 1.5rem;
		color: white;
		font-family: sans-serif;
		display: flex;
		flex-direction: row;
		height: 2.5rem;
	}

	#logo {
		flex-grow: 1;
		padding: 0.5rem;
	}

	a {
		color: white;
		text-decoration: none;
		padding: 0.5rem;
	}

	.activated {
		background-color: #fff4;
	}

	div {
		padding: 0.5rem;
	}
</style>
