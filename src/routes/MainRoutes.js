import React from 'react'
import { Routes,Route } from 'react-router-dom'
import MainPage from '../components/MainPage/MainPage'
import DetailPage from '../components/DetailPage/DetailPage'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/user'} element={<DetailPage/>}/>
    </Routes>
  )
}

export default MainRoutes