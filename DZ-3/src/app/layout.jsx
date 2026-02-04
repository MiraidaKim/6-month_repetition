import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import './layout.css'

export function Layout() {
  return (
    <>
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">Footer</footer>
    </>
  )
}
