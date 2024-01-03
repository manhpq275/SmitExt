import gAxios from '@utils/axiosGlobal'
import {setCookie} from '@pages/helper'

export async function requestLogin(loginInfo){
  return gAxios(
    {
      method: 'post',
      url: 'api/auth/login',
      data: {
        email: loginInfo.email,
        password: loginInfo.password,
      }
    }
  )
  .then(response => {
    const token = response?.data?.data?.accessToken ||  '';
    if(token){
      setCookie("cookie_token", token, 7);
    }
    return response.data;
  })
  .catch(err => err.response.data)
}

export async function requestAllUser(){
  return gAxios.get('api/user/get-all-members')
  .then(response => {
    return response;
  })
  .catch(err => err.response)
}