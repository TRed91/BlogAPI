import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import { useEffect, useState } from 'react'

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MYAPI_HOST}/authenticate`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(data => setUser(data.user))
    .catch(err => console.error(err.message));
  }, []);

  return (
    <>
      <Header user={user}/>
      <Outlet context={[user, setUser]}/>
    </>
  )
}

export default App
