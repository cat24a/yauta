import Tasks from "../Tasks.js";

export function updateValue(task, key, value) {
	if (task[key] === value) return;
	Tasks.update(data => {
		return [
			...data.filter(i => i.id !== task.id),
			{ ...task, [key]: value },
		];
	});
}

export function deleteTask(task) {
	Tasks.update(data => data.filter(i => i.id != task.id));
}
