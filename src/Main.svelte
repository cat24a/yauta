<script>
    import Navbar from "./Navbar.svelte";
    import App from "./App.svelte";
    import LoginForm from "./LoginForm.svelte";

    import {login, setLoginData, needLogin, isLoggedIn, message} from "./account.js";

    setLoginData(JSON.parse(localStorage.getItem("logindata")));
    login();
    
</script>

<Navbar />

{#if $isLoggedIn}
    <App />
{:else if $needLogin}
    <LoginForm />
{:else}
    <p>{$message}</p>
{/if}