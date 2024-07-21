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
	import { deleteTask } from "./util.js";

	export let task;
</script>

<button type="button" id="delete" on:dblclick={() => deleteTask(task)}>
	<i class="fa-trash-can fa-solid" />
</button>

<style>
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
	button i {
		font-size: 1.5rem;
	}
</style>
