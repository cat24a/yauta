<script>
    import {createEventDispatcher} from "svelte";
    import {sha3, aes, unaes} from './crypto_util.js';
    import {message} from "./account.js";
    import { sendApiRequest } from "./api.js";

    let dispatchEvent = createEventDispatcher();
    let isRegistration = false;
    let actionName;
    $: actionName = isRegistration ? "Register" : "Log in";
    let user;
    let pass;


    async function handleSubmit() {
        if(isRegistration) {
            await sendApiRequest({
                "user":sha3(user),
                "pass":sha3(pass),
                "data":aes({}, pass),
                "action":"add_user"
            });
        }
        dispatchEvent("login", {user, pass});
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h3>{actionName}:</h3>
    <table>
        <tr>
            <td>User:</td>
            <td><input type="text" name="user" bind:value={user} /></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="password" name="password" bind:value={pass} /></td>
        </tr>
        <tr>
            <td><button type="submit">{actionName}</button></td>
            <td><a on:click={()=>{isRegistration=!isRegistration}} href="#">{#if !isRegistration}don't {/if}have an account?</a></td>
        </tr>
    </table>
    <p>{$message}</p>
</form>