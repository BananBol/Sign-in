import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setData } from '../../redux/slices/dataSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css'
import { useState } from 'react';
import Loading from '../loading/Loading';
import { showError, showSuccess } from '../../utils/alert/alert';

function MainPage() {

  const {
    register, 
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({mode: "onChange"})

  const navigate = useNavigate()

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


  return (
    
  <div className='card'>
    {isLoading 
    ?
    <Loading/>
     :
     <div className='Sign'>
        <p>Sign in</p>
        <div className='signin'>
          <p>Sign in and start managing your candidates!</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text'>
      <div>
      <TextField
      
      {...register('username', {
        required: 'Имя не может быть пустым',
        minLength: {
          value: 4,
          message: 'Минимум 4 символов'
        },
        maxLength:{
          value: 15,
          message: 'Максимум 15 символов'
        }
      })}
      placeholder='Введите ваше имя'
      type='text'
      />
      {errors?.username && (<div className='textfield'>{errors.username.message}</div>)}
      </div>
      <div>
      <TextField
      
      {...register('password', {
        required: 'Имя не может быть пустым',
        minLength: {
          value: 4,
          message: 'Минимум 4 символов'
        },
        maxLength:{
          value: 15,
          message: 'Максимум 15 символов'
        }
      })}
      placeholder='Введите ваш пароль'
      type='text'
      />
      {errors?.password && (<div className='textfield'>{errors.password.message}</div>)}
      </div>
      <div className='input'>
        <input 
         type='submit'
         onClick={() => navigate('/user')}
         />
      </div>
      
      
      
      </div>
    </form>
    </div>
    }
        
    
  </div>
    
  );
}

export default MainPage;
