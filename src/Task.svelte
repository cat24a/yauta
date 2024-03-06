<script>
    import Tasks from "./Tasks.js";

    export let task;
    let done = task.done;
    let name = task.name;
    let due = task.due;
    $: updateValue("name", name);
    $: !task.done == !done ? null : updateValue("done", done ? Date.now() : 0);
    $: updateValue("due", due);
    let daysleft;
    $: daysleft = Math.round((new Date(due).getTime() - Date.now())/24/3600_000);

    function updateValue(key, value) {
        if(task[key] === value) return;
        Tasks.update(data => {
            return [
                ...data.filter(i => i.id != task.id),
                {...task, [key]:value}
            ];
        });
    }

    function deleteThisTask() {
        Tasks.update(data => data.filter(i => i.id != task.id));
    }
</script>

<div class:fortomorrow={daysleft == 0} class:shouldbealreadydone={daysleft < 0}>
    <input type="checkbox" id="done" bind:checked={done} />

    <p contenteditable bind:innerText={name} on:keypress={event => {
        if(event.key == "Enter"){
            event.preventDefault();
            event.target.blur(); // works
        }
    }}/>

    <input type="date" bind:value={due} />

    <button type="button" id="delete" on:dblclick={deleteThisTask}>
        <i class="fa-trash-can fa-solid" />
    </button>
</div>

<style>
    div {
        display: flex;
        /* padding: 1em 1.5em; */
        border-top: 1px solid lightgray;
    }

    p {
        margin: 0;
        padding: 1.25em 0;
        flex-grow: 1;
        outline: none;
    }

    #done {
        margin: 1rem 1.5rem;
        border: 2px solid lightgray;
        height: 1.5rem;
        width: 1.5rem;
    }

    button {
        width: 3rem;
        height: 3rem;
        margin: 0.25rem;
        background-color: transparent;
        padding: none;
        border: none;
        border-radius: 0.5rem;
    }
    button:hover {
        background-color: #0002;
    }
    button i{
        font-size: 1.5rem;
    }

    .fortomorrow input[type="date"] {
        color: #a50;
    }

    .shouldbealreadydone input[type="date"] {
        color: #a00
    }
</style>