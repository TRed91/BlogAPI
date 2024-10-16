import './App.css'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './stylesheets/index.css'

function App() {
  const [ user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MYAPI_HOST}/authenticate`, {
      method: "get",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
  }).then(res => res.json())
    .then(data => setUser(data.user));
  }, [])
  
  return (
    <>
      <Header user={user}/>
      <Outlet context={[user, setUser]}/>
    </>
  )
}

export default App
