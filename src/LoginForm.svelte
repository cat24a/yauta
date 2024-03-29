<script>
	import { createEventDispatcher } from "svelte";
	import { sha3, aes, yautahash } from "./crypto_util.js";
	import { login, message, setLoginData } from "./account.js";
	import { sendApiRequest } from "./api.js";

	let dispatchEvent = createEventDispatcher();
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
	<h3>{actionName}:</h3>
	<table>
		<tr>
			<td>User:</td>
			<td>
				<input type="text" name="user" bind:value={user} />
			</td>
		</tr>
		<tr>
			<td>Password: </td>
			<td>
				<input type="password" name="password" bind:value={pass} />
			</td>
		</tr>
		<tr>
			<td>
				<button type="submit">{actionName}</button>
			</td>
			<td>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					on:click={() => {
						isRegistration = !isRegistration;
					}}
					href="#"
				>
					{#if !isRegistration}don't{/if}
					have an account?
				</a>
			</td>
		</tr>
	</table>
	<p>{$message}</p>
</form>
