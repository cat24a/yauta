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
	import Settings from "./Settings.js";
	import Tasks from "./Tasks.js";
	let input;
	function handleSubmit() {
		if (input == "") return;
		if ($Settings.dogmode && $Settings.dogcheck) {
			if (
				!(
					input.includes("dog") ||
					input.includes("pies") ||
					input.includes("psa") ||
					input.includes("psu") ||
					input.includes("psem") ||
					input.includes("psie")
				)
			) {
				alert(
					'dogcheck: Error: no dog found - please add "dog" to your task or disable dogcheck'
				);
				return;
			}
		}
		Tasks.update(current => [
			...current,
			{
				name: input,
				id: Date.now(),
			},
		]);
		input = "";
	}
	function handleKeyPress(event) {
		if (event.key != "Enter") return;
		handleSubmit();
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<i class="fa-solid fa-plus" />
	<input
		type="text"
		bind:value={input}
		placeholder="New task"
		on:keyup={handleKeyPress}
	/>
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
