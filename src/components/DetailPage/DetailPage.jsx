import React, { useEffect } from 'react'
import { useState } from 'react'
import { setData } from '../../redux/slices/dataSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './DetailPage.css'
import Loading from '../loading/Loading'
import { showError,showSuccess } from '../../utils/alert/alert'

const DetailPage = () => {



  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://codify-teens.vercel.app/login ', data)
      dispatch(setData(response))
      showSuccess('Успешно', 'Вошли')
    } catch (e) {
      if (e.response.status === 400) {
        showError('В запросе есть синтаксическая ошибка.Код ошибки 400')
      } else if (e.response.status === 401) {
        showError('Доступ запрещен или требуется авторизация.Код ошибки 401')
      } else if (e.response.status === 403) {
        showError('доступ к запрашиваемой странице запрещен или у пользователя нет прав на просмотр контента.Код ошибки 403')
      } else if (e.response.status === 404) {
        showError('связь с сервером установлена, но данных по заданному запросу на сервере нет.Код ошибки 404')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    onSubmit()
  }, [])

  return (
    <div className='Det'>
      {isLoading ?
      <Loading/>
      :
      <div className='Details'>
        <p>Name:</p>
       
       <div>
        <p>Name:</p>
       </div>
       <div>
        <p>Name:</p>
       </div>
       <div>
        <p>Name:</p>
       </div>
      </div>
      }

    </div>
  )
}

export default DetailPage