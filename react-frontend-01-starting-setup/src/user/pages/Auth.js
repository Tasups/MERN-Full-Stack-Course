import React, { useState, useContext } from 'react'
import fetch from 'node-fetch'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

const baseURL = 'http://localhost:5000/api'

const Auth = () => {
  
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  
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
    setIsLoading(true);
    
    if (isLoginMode) {
      try {
        const response = await fetch(`${baseURL}/users/login`, {
          method: "POST",
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (error) {
        console.log("error: ", error);
        setIsLoading(false);
        setError(error.message || "Something went wrong, please try again.");
      }
    } else {
      try {
          const response = await fetch(`${baseURL}/users/signup`, {
            method: "POST",
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            headers: {
              "Content-Type": "application/json",
            }
          });

        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        auth.login();
        } catch(error) {
        console.log('error: ', error)
        setIsLoading(false)
        setError(error.message || 'Something went wrong, please try again.')
        }
    }
    setIsLoading(false)
    
    
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

  const errorHandler = () => {
    setError(null)
  }
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>LOGIN REQUIRED</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your first and last name."
              onInput={inputHandler}
            />
          )}
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
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Auth