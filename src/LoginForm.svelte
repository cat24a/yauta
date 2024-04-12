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
	import Literal from "./Literal.svelte";

	import { createEventDispatcher } from "svelte";
	import { sha3, aes, yautahash } from "./crypto_util.js";
	import { login, message, setLoginData } from "./account.js";
	import { sendApiRequest } from "./api.js";

	let isRegistration = false;
	let actionName;
	$: actionName = isRegistration ? "Register" : "Log in";
	let user;
	let pass;

	async function handleSubmit() {
		const key = yautahash(user, pass);
		const passhash = sha3(key);
		if (isRegistration) {
			await sendApiRequest({
				user: sha3(user),
				pass: passhash /*sha3(pass)*/,
				data: aes({}, key /*pass*/),
				action: "add_user",
			});
		}
		const loginData = { user, pass, passhash, key };
		setLoginData(loginData);
		localStorage.setItem("logindata", JSON.stringify(loginData));
		login();
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h3><Literal>{actionName}:</Literal></h3>
	<table>
		<tr>
			<td><Literal>Username:</Literal></td>
			<td>
				<input type="text" name="user" bind:value={user} />
			</td>
		</tr>
		<tr>
			<td><Literal>Password:</Literal></td>
			<td>
				<input type="password" name="password" bind:value={pass} />
			</td>
		</tr>
		<tr>
			<td>
				<button type="submit"><Literal>{actionName}</Literal></button>
			</td>
			<td>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					on:click={() => {
						isRegistration = !isRegistration;
					}}
					href="#"
				>
					<Literal>
						{#if !isRegistration}don't have an account?
						{:else}have an account?
						{/if}
					</Literal>
				</a>
			</td>
		</tr>
	</table>
	<p><Literal>{$message}</Literal></p>
</form>
