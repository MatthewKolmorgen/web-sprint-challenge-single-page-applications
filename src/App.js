//From Libraries
import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup'
//Local Files
import Header from './Components/LambdaEats';
import PizzaForm from './Components/PizzaForm';
import Home from './Components/Home'

const initialFormValues = {
  //Pizza Size drop down
  size: '',

  //Pizza Sauce Buttons
  sauce: '',

  //Toppings Checkboxes
  toppings: {
    pepperoni: false,
    sausage: false,
    canadian: false,
    italian: false,
    onions: false,
    peppers: false,
    tomatos: false,
    olives: false,
    garlic: false,
    artichoke: false,
    threecheese: false,
    pineapple: false,
    xcheese: false
  },
  //Special Instructions
  special: '',
}

const errors = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
}

const initialPizza = ([])

const instialButtonState = true

export default function App(){
  const [pizza, setPizza] = useState(initialPizza)    

  const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters'),
    special: yup.string(),
    sauce: yup.string().required(),
    size: yup.string().required()
  })

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(res => {
        console.log(res.data)
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger
        console.log('error')
      })
  }

  const [formValues, setFormValues] = useState(initialFormValues)

  const submit = () => {
    const pizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      special: formValues.special.trim(),
      toppings: Object.keys(formValues.toppings).filter(tp => formValues.toppings[tp]),
    }
    postNewOrder(pizza)
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  const [formErrors, setFormErrors] = useState(errors) 

  const inputChange = (name, value) => {

    yup.reach(schema, name).validate(value)
      .then(valid => {
        setFormErrors({...formErrors, [name]: '',})
      })

      .catch(err => {
        console.log(name)
        setFormErrors({...formErrors, [name]: err.errors,})
      })

    setFormValues({...formValues, [name]: value })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({...formValues, toppings: {...formValues.toppings,[name]: isChecked,}})
  }

  const [disabled, setDisabled] = useState(instialButtonState) 

  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route path='/order'>
          <PizzaForm 
            values={formValues}
            inputChange={inputChange}
            checkboxChange={checkboxChange}
            submit={submit}
            disabled={disabled}
            errors={formErrors}/>
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}