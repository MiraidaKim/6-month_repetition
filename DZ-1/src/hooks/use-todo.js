import { create } from 'zustand'

export const useTodoState = create((set) => ({
	todos: [],

	addTodo: (title) => {
		set(state => ({
			todos: [
				...state.todos,
				{
					id: Date.now(),
					title: title,
					isCompleted: false,
				},
			],
		}))
	},

	deleteTodo: (id) => {
		set(state => ({
			todos: state.todos.filter(todo => todo.id !== id),
		}))
	},

	toggleTodo: (id) => {
		set(state => ({
			todos: state.todos.map(todo =>
				todo.id === id
					? { ...todo, isCompleted: !todo.isCompleted }
					: todo
			),
		}))
	},
}))
