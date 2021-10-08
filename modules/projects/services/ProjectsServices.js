import { v4 as generateUUID } from "uuid"

import { ProjectsModel } from "../models/ProjectsModel";

export class ProjectsServices {

  /**
   * 
   * @returns Retrieve all created Project
   */
  static async getAllProjects() {

    const projects = await ProjectsModel.findAll()

    let results = []
    let key = 0
    for (const project of projects) {
      const projectCreatedAt = project[ProjectsModel.fields.createdAt]
      const projectDate = new Date(projectCreatedAt)

      let result = {
        id: key += 1,
        uuid: project[ProjectsModel.fields.uuid],
        date: projectDate.toLocaleString('en', { day: 'numeric', month: 'short', year: 'numeric' }),
        slug: project[ProjectsModel.fields.slug],
        article: project[ProjectsModel.fields.article],
        title: project[ProjectsModel.fields.title],
        desc: project[ProjectsModel.fields.description],
        status: project[ProjectsModel.fields.status]
      }

      results.push(result)

    }
    return results

  }

  /**
   * Create a new Project
   * 
   * @param {string} string Title of project
   * @param {string} string Description
   * @param {string} string Article
   * @param {string} string Check if Project is published or unpublished 
   */
  static async createNewProject({ title, desc, article, status }) {

    let slug = await ProjectsServices.generateSlug(title)

    let newProject = {
      [ProjectsModel.fields.uuid]: generateUUID(),
      [ProjectsModel.fields.slug]: slug,
      [ProjectsModel.fields.title]: title,
      [ProjectsModel.fields.description]: desc,
      [ProjectsModel.fields.article]: article,
      [ProjectsModel.fields.status]: status
    }

    const projects = await ProjectsModel.insert(newProject)

    return projects
  }

  static async updateProject({ id, title, desc, article, status }) {

    let slug = await ProjectsServices.generateSlug(title)
    if (!slug)
      return


    const data = {
      [ProjectsModel.fields.title]: title,
      [ProjectsModel.fields.slug]: slug,
      [ProjectsModel.fields.description]: desc,
      [ProjectsModel.fields.article]: article,
      [ProjectsModel.fields.status]: status,
      [ProjectsModel.fields.updatedAt]: new Date().toISOString()
    }

    const response = await ProjectsModel.updateProjectByID(id, data)

    return response

  }

  /**
   * Create Slug for projects
   * 
   * @param {string} string Use to create a slug  
   */
  static generateSlug(text) {

    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

  }

}
