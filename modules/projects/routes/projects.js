import { Router } from "express";
import { ProjectsModel } from "../models/ProjectsModel";

import { ProjectsServices } from "../services/ProjectsServices";

const router = Router()
export const projects = Router().use('/projects', router)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

router.get('/', async (request, response) => {
  try {

    response.send(await ProjectsServices.getAllProjects())

  } catch (error) {

    console.log(error)
    response.status(500).send('Cannot get Projects.')

  }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

router.post('/', async (request, response) => {

  let { title, desc, article, status } = request.body
  
  try {
    
    const data = await ProjectsServices.createNewProject({ title, desc, article, status })
    response.send(data)

  } catch (error) {

    console.log(error)
    response.status(500).send('Cannot create new Projects.')

  }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

router.patch('/:id', async (request, response) => {
  let { id } = request.params
  let {title, desc, article, status} = request.body
  
  try {
    
    const data = await ProjectsServices.updateProject({ id, title, desc, article, status })
    response.sendStatus(200).send(data)
    
    
  } catch (error) {

    console.log(error)
    response.status(500).send('Cannot Update Projects.')

  }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

router.delete('/:id', async (request, response) => {
  let { id } = request.params
  
  try {
    
    const data = await ProjectsModel.delete(id)
    response.sendStatus(200)
    
  } catch (error) {

    console.log(error)
    response.status(500).send('Cannot Update Projects.')

  }
})
