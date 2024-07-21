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
	import Settings from "../Settings.js";

	export let gemcount;

	let counter;

	$: if (counter) counter.style.setProperty("--gem-count", gemcount);
	$: if (counter)
		counter.style.setProperty(
			"--gem-count-max",
			Math.max(
				$Settings.gem_gems_aftertime,
				$Settings.gem_gems_ontime,
				$Settings.gem_gems_beforetime,
				$Settings.gem_gems_notime
			).toString()
		);
</script>

<div
	class="gemcounter"
	class:desktoponly={$Settings.gem_badge_desktoponly}
	bind:this={counter}
>
	<i class="fa-regular fa-gem" />
	<div>{gemcount}</div>
</div>

<style>
	.gemcounter {
		background-color: color-mix(
			in oklab,
			lightgray
				calc(100% - 100% * (var(--gem-count) / var(--gem-count-max))),
			#19f calc(100% * (var(--gem-count) / var(--gem-count-max)))
		);
		border-radius: 1rem;
		height: 2.5rem;
		width: 2.5rem;
		margin: 0 1rem;
		text-align: center;
		vertical-align: middle;
	}
</style>
