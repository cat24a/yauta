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
	import Literal from "./Literal.svelte";

	import { supported as supportedLangs } from "./lang";

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
	let gem_edit_dialog;
</script>

<main>
	<h1><Literal>Settings</Literal></h1>
	<section>
		<h3><Literal>General</Literal></h3>
		<p>
			<Literal>Language</Literal>:
			<select bind:value={$Settings.general_lang}>
				<option />
				{#each supportedLangs as lang (lang)}
					<option>{lang}</option>
				{/each}
			</select>
		</p>
		<p>
			<Literal>Show saving state</Literal>:
			<input
				type="checkbox"
				bind:checked={$Settings.general_showsavingstate}
			/>
		</p>
		<p>
			<Literal>Date refresh hour (UTC)</Literal>:
			<input
				type="number"
				bind:value={$Settings.general_daterefreshtime}
			/>
		</p>
	</section>
	<section>
		<h3><Literal>Dog settings</Literal></h3>
		<p>
			<Literal>
				Enable dog mode (experimental - use at your own risk)
			</Literal>
			<input type="checkbox" bind:checked={$Settings.dogmode} />
		</p>
		{#if $Settings.dogmode}
			<p>
				<Literal>Enable dogcheck</Literal>:
				<input type="checkbox" bind:checked={$Settings.dogcheck} />
			</p>
		{/if}
	</section>
	<section>
		<h3><Literal>Gems</Literal></h3>
		<p>
			<Literal>Enable gems</Literal>:
			<input type="checkbox" bind:checked={$Settings.gem_enable} />
		</p>
		{#if $Settings.gem_enable}
			<p>
				<Literal>Gem store URL</Literal>:
				<input
					type="text"
					bind:value={$Settings.gem_url}
					placeholder="on YAUTA account"
				/>
				<button
					type="button"
					bind:this={gem_url_new_button}
					on:dblclick={handleNewGemUrl}
				>
					<Literal>new store (dblclick)</Literal>
				</button>
			</p>
			<small>
				<Literal>
					If a url is present, the gem amount will be stored in the
					specified location, unencrypted. This will allow external
					apps to use your gems. If empty, the gem amount will be
					stored with your YAUTA account and will be end-to-end
					encrypted, but harder to access by external apps.
				</Literal>
			</small>
			<p>
				<Literal>Edit gem amount</Literal>:
				<button on:click={() => gem_edit_dialog.showModal()}>
					<Literal>edit</Literal>
				</button>
				<dialog bind:this={gem_edit_dialog}>
					<form
						method="dialog"
						on:submit={() => {
							if ($Settings.gem_url)
								fetch($Settings.gem_url, {
									method: "SET",
									body: $Settings.gem_amount,
								});
						}}
					>
						<h4><Literal>Edit gem amount</Literal>:</h4>
						<p>
							<Literal>Gem amount</Literal>:
							<input
								type="number"
								bind:value={$Settings.gem_amount}
							/>
							<button><Literal>save</Literal></button>
						</p>
						<small>
							<Literal>
								Not pressing "save" may or may not save your gem
								amount.
							</Literal>
						</small>
					</form>
				</dialog>
			</p>
			<p>
				<Literal>Show gem badge on tasks</Literal>:
				<input
					type="checkbox"
					bind:checked={$Settings.gem_show_badge}
				/>
				{#if $Settings.gem_show_badge}
					<div>
						- <Literal>Only on big screens</Literal>:
						<input
							type="checkbox"
							bind:checked={$Settings.gem_badge_desktoponly}
						/>
					</div>
				{/if}
			</p>
			<p>
				<Literal>Before time gems</Literal>:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_beforetime}
				/>
			</p>
			<p>
				<Literal>On time gems</Literal>:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_ontime}
				/>
			</p>
			<p>
				<Literal>After time gems</Literal>:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_aftertime}
				/>
			</p>
			<p>
				<Literal>No time limit gems</Literal>:
				<input
					type="number"
					min="0"
					required
					bind:value={$Settings.gem_gems_notime}
				/>
			</p>
		{/if}
	</section>
	<section>
		<h3><Literal>Debugging</Literal></h3>
		<small>
			<Literal>An average user should not touch these settings.</Literal>
		</small>
		<p>
			<Literal>Debug translations</Literal>:
			<input
				type="checkbox"
				bind:checked={$Settings.debug_translations}
			/>
		</p>
	</section>
</main>

<style>
	main {
		margin: 1rem;
		overflow-y: scroll;
	}
</style>
