import React, { useState, useContext } from 'react'
import fetch from 'node-fetch'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

const baseURL = 'http://192.168.1.117:8081/api'

const Auth = () => {
  
  const auth = useContext(AuthContext)
  
  const [isLoginMode, setIsLoginMode] = useState(true)
  
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  },
  false)
  
  const authSubmitHandler = async (event) => {
    event.preventDefault()
    
    if (isLoginMode) {
      
    } else {
      const userPostCall = async () => {
        try {
          const data = await fetch(`${baseURL}/user/signup`, {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            headers: {
              'Content-Type': 'application/json'
            },
          })
          console.log('data: ', data)
        } catch(error) {
          console.log('error: ', error)
        }
      }
      
      // const userPostCall = async () => {
      //     try {
      //       const { data } = await axios.post(`${baseURL}/user/signup`,  {
      //         // your expected POST request payload goes here
      //         name: formState.inputs.name.value,
      //         email: formState.inputs.email.value,
      //         password: formState.inputs.password.value,
      //         headers: {
      //           'Content-Type': 'application/json'
      //         },
      //       })
      //       // enter you logic when the fetch is successful
      //       // data.json()
      //       console.log(`data: `, data)
      //     } catch (error) {
      //       // enter your logic for when there is an error (ex. error toast)
      //       console.log(`error: `, error)
      //     }
      //   }


      userPostCall()
      }
    auth.login()
  }
  
  const switchModeHandler = () => {
    if(!isLoginMode){
      setFormData({
        ...formState.inputs,
        name: undefined,
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else
    {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setIsLoginMode(prev => !prev)
  }
  
  return(
    <Card className="authentication">
      <h2>LOGIN REQUIRED</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {
          !isLoginMode &&
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your first and last name."
            onInput={inputHandler}
          />
        }
        <Input 
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input 
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a password of at least 8 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode? 'SIGN UP' : 'LOGIN'}
      </Button>
    </Card>
  )
}

export default Auth