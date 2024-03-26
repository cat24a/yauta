<script>
    import Settings from "./Settings";
</script>

<main>
    <h1>YUPS (YAUTA User Preferences and Settings)</h1>
    <section>
        <h3>dog settings</h3>
        <p>Enable dog mode (experimental - use at your own risk) <input type=checkbox bind:checked={$Settings.dogmode} /></p>
        {#if $Settings.dogmode}
            <p>Enable dogcheck: <input type=checkbox bind:checked={$Settings.dogcheck} /></p>
        {/if}
    </section>
</main>

<style>
    main {
        margin: 1rem;
        overflow-y: scroll;
    }
</style>