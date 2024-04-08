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
	import Settings from "./Settings";

	//gems
	let gem_url_new_button;
	async function handleNewGemUrl() {
		gem_url_new_button.disabled = true;
		const response = await fetch("https://gemapi.yauta.top/", {
			method: "CREATE",
		});
		const url = await response.text();
		$Settings.gem_url = `https://gemapi.yauta.top/${url}`;
		gem_url_new_button.disabled = false;
	}
</script>

<main>
	<h1>YUPS (YAUTA User Preferences and Settings)</h1>
	<section>
		<h3>General</h3>
		<p>
			Show saving state:
			<input
				type="checkbox"
				bind:checked={$Settings.general_showsavingstate}
			/>
		</p>
		<p>
			Date refresh hour (UTC):
			<input
				type="number"
				bind:value={$Settings.general_daterefreshtime}
			/>
		</p>
	</section>
	<section>
		<h3>Dog settings</h3>
		<p>
			Enable dog mode (experimental - use at your own risk)
			<input type="checkbox" bind:checked={$Settings.dogmode} />
		</p>
		{#if $Settings.dogmode}
			<p>
				Enable dogcheck:
				<input type="checkbox" bind:checked={$Settings.dogcheck} />
			</p>
		{/if}
	</section>
	<section>
		<h3>Gems</h3>
		<p>
			Enable gems:
			<input type="checkbox" bind:checked={$Settings.gem_enable} />
		</p>
		{#if $Settings.gem_enable}
			<p>
				Gem store URL:
				<input type="text" bind:value={$Settings.gem_url} />
				<button
					type="button"
					bind:this={gem_url_new_button}
					on:dblclick={handleNewGemUrl}
				>
					new store (dblclick)
				</button>
			</p>
			<small>WARNING: gem amount is NOT end-to-end encrypted</small>
			<p>
				Show gem badge on tasks:
				<input
					type="checkbox"
					bind:checked={$Settings.gem_show_badge}
				/>
				{#if $Settings.gem_show_badge}
					<div>
						- Only on big screens:
						<input
							type="checkbox"
							bind:checked={$Settings.gem_badge_desktoponly}
						/>
					</div>
				{/if}
			</p>
			<p>
				Before time gems:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_beforetime}
				/>
			</p>
			<p>
				On time gems:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_ontime}
				/>
			</p>
			<p>
				After time gems:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_aftertime}
				/>
			</p>
			<p>
				No time limit gems:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_notime}
				/>
			</p>
		{/if}
	</section>
</main>

<style>
	main {
		margin: 1rem;
		overflow-y: scroll;
	}
</style>
