import { BaseModel } from "../../../core/models/BaseModel"

class ProjectsModel extends BaseModel {

  constructor() {

    const fields = {

      id: 'projects_id',
      uuid: 'projects_uuid',
      slug: 'projects_slug',
      title: 'projects_title',
      description: 'projects_description',
      article: 'projects_article',
      status: 'projects_status',
      createdAt: 'projects_created_at',
      updatedAt: 'projects_updated_at'

    }

    super({
      table: 'projects',
      primaryKey: fields.uuid,
      singularName: 'project',
      defaultOrderByColumn: fields.id
    })

    this.fields = fields

  }

  /**
   * 
   */
  updateProjectByID(id, data) {
    return this.query()
      .where({[this.fields.uuid]: id})
      .update(data)
  }

}

const projectsModel = new ProjectsModel()
export { projectsModel as ProjectsModel }
