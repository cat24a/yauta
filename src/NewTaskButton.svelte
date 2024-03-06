<script>
    import Tasks from "./Tasks.js";
    let input;
    function handleSubmit() {
        if(input == "") return;
        Tasks.update(current => [
            ...current,
            {
                name: input,
                id: Date.now(),
            }
        ])
        input = "";
    }
    function handleKeyPress(event) {
        if (event.key != "Enter") return;
        handleSubmit();
    }

</script>

<form on:submit|preventDefault={handleSubmit}>
    <i class="fa-solid fa-plus" />
    <input type="text" bind:value={input} placeholder="New task" on:keyup={handleKeyPress}/>
</form>

<style>
    form {
        background-color: transparent;
        border: none;
        border-top: 1px solid lightgray;
        font-size: 1rem;
        text-align: left;
        color: black;
        display: flex;
    }

    i {
        margin: 1rem 1.5rem;
        font-size: 1.5rem;
    }

    input {
        display: inline;
        margin: 0;
        line-height: 24px;
        border: none;
        outline: none;
        flex-grow: 1;
        padding: 1em 0;
    }
</style>