import { Router } from "express";

import { UsersModel } from "../models/UsersModel"
import { UsersServices } from "../services/UsersServices"

const router = Router()
export const users = Router().use('/users', router)

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

router.post('/', async (request, response) => {
  
  const { body, method } = request
  if (method !== 'POST' && method !== 'PATCH')
    return next()
  
  const isPOST = method === 'POST'
  const { id } = request.params

  try {
    
    /* create or edit the user */
    const result = await (isPOST ? UsersServices.create(body) : UsersModel.update(id, body))

    response.status(isPOST ? 201 : 200).send(result)

  } catch (error) {
    
    let statusCode = 500;
    let message = 'An error occurred in saving the user';
    switch(error.number)
    {
      /* 2601 is the error number for unique constraint errors. */
      case 2601:
        statusCode = 409;
        message = 'User with given email or username already exists';
        break;

      /* 515 is the error that occurs when a field value cannot be null. */
      case 515:
        statusCode = 400;
        message = 'Incomplete data provided';
        break;

      default:
        console.error(error);
    }

    response.send(statusCode, message);

  }

})

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

router.post('/login', async (request, response) => {
  
  const { identity, password } = request.body
  if (!identity || !password)
    return response.status(400).send({ msg: 'Invalid credentials'})

  try {
    
    const user = await UsersServices.login(identity, password)
    response.status(user ? 200 : 402).send(user)

  } catch (error) {
    
    console.log(error)
    response.status(500).send({ msg: 'Cannot login' })

  }

})
