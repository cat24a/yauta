<script>
    import { createEventDispatcher } from "svelte";
	import Settings from "./Settings";

    const dispatchEvent = createEventDispatcher();

    export let settingsopen = false;
</script>

<nav>
    <span id="logo">YAUTA {#if $Settings.dogmode}dog mode{/if}</span>
    <a href="https://github.com/cat24a/yauta/issues" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click={()=>{dispatchEvent("settingsui-toggle")}} id="settings-button" class:activated={settingsopen} ><i class="fa-solid fa-gear"></i></a>
</nav>

<style>
    nav {
        background-color: #1199ff;
        font-size: 1.5rem;
        color: white;
        font-family: sans-serif;
        display: flex;
        flex-direction: row;
        height: 2.5rem;
    }

    #logo {
        flex-grow: 1;
        padding: .5rem;
    }
    
    a {
        color: white;
        text-decoration: none;
        padding: .5rem;
    }

    .activated {
        background-color: #fff4;
    }    
</style>