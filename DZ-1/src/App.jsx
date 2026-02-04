import { useState } from 'react'
import { useTodoState } from './hooks/use-todo'

function App() {
	const [value, setValue] = useState('')

	const { todos, addTodo, deleteTodo, toggleTodo } = useTodoState()

	const add_todo_fn = () => {
		if (value.trim() === '') return
		addTodo(value)
		setValue('')
	}

	return (
		<div>
			<h1>Todo List</h1>

			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Введите задачу"
			/>
			<button onClick={add_todo_fn}>Добавить</button>

			<ul>
				{todos.map(item => (
					<li key={item.id}>
						<span
							onClick={() => toggleTodo(item.id)}
							style={{
								cursor: 'pointer',
								textDecoration: item.isCompleted
									? 'line-through'
									: 'none',
							}}
						>
							{item.title}
						</span>

						<button onClick={() => deleteTodo(item.id)}>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
