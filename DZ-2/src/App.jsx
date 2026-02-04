import { Routes, Route } from 'react-router-dom'
import { UsersList } from './components/users-list'
import { UserPage } from './pages/user-page'

function App() {
	return (
		<Routes>
			<Route path='/' element={<UsersList />} />
			<Route path='/users/:id' element={<UserPage />} />
		</Routes>
	)
}

export default App
