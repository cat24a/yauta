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
	import Navbar from "./Navbar.svelte";
	import App from "./App.svelte";
	import LoginForm from "./LoginForm.svelte";
	import SettingsUi from "./SettingsUi.svelte";
	import Literal from "./Literal.svelte";

	import {
		login,
		setLoginData,
		needLogin,
		isLoggedIn,
		message,
	} from "./account.js";

	setLoginData(JSON.parse(localStorage.getItem("logindata")));
	login();

	let settingsUiVisible = false;

	function handleSettingsUiToggle() {
		settingsUiVisible = !settingsUiVisible;
	}
</script>

<Navbar
	on:settingsui-toggle={handleSettingsUiToggle}
	settingsopen={settingsUiVisible}
/>

{#if $isLoggedIn}
	{#if settingsUiVisible}
		<SettingsUi />
	{:else}
		<App />
	{/if}
{:else if $needLogin}
	<LoginForm />
{:else}
	<p><Literal>{$message}</Literal></p>
{/if}
