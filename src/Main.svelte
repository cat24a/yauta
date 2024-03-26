<script>
    import Navbar from "./Navbar.svelte";
    import App from "./App.svelte";
    import LoginForm from "./LoginForm.svelte";
    import SettingsUi from "./SettingsUi.svelte";

    import {login, setLoginData, needLogin, isLoggedIn, message} from "./account.js";

    setLoginData(JSON.parse(localStorage.getItem("logindata")));
    login();

    let settingsUiVisible = false;

    function handleSettingsUiToggle() {
        settingsUiVisible = !settingsUiVisible;
    }
    
</script>

<Navbar on:settingsui-toggle={handleSettingsUiToggle} settingsopen={settingsUiVisible} />

{#if $isLoggedIn}
    {#if settingsUiVisible}
        <SettingsUi />
    {:else}
        <App />
    {/if}
{:else if $needLogin}
    <LoginForm />
{:else}
    <p>{$message}</p>
{/if}