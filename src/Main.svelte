<script>
    import Navbar from "./Navbar.svelte";
    import App from "./App.svelte";
    import LoginForm from "./LoginForm.svelte";

    import {login, setLoginData, needLogin, isLoggedIn, message} from "./account.js";

    function handleLogin(event) {
        setLoginData(event.detail);
        localStorage.setItem("logindata", JSON.stringify(event.detail));
        login();
    }

    setLoginData(JSON.parse(localStorage.getItem("logindata")));
    login();
    
</script>

<Navbar />

{#if $isLoggedIn}
    <App />
{:else if $needLogin}
    <LoginForm on:login={handleLogin} />
{:else}
    <p>{$message}</p>
{/if}