'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const StorageUser = use("App/Services/StorageUser");
const FileService = use("App/Services/AttachmentService");
const Helpers = use("Helpers");
const Env = use("Env");

const slash = "/";

const Database = use("Database");
const UserPhotos = use("App/Models/UserPhotos");
const fs = require("fs");

const ModelHelper = require("../../Helpers/ModelHelper");
/**
/**
 * Resourceful controller for interacting with userphotos
 */
class UserPhotoController {
  /**
   * Show a list of all userphotos.
   * GET userphotos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new userphoto.
   * GET userphotos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new userphoto.
   * POST userphotos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      let newPhoto = request.all()
      let user = await auth.getUser()
  
      let image = newPhoto.base;
      const path = Helpers.publicPath("tmp");
      const fileName = new Date().getTime() + ".png";
      let base64Image = image.split(";base64,").pop();
      const fileSave = `${path}${slash}${fileName}`;
      await fs.writeFileSync(fileSave, base64Image, { encoding: "base64" });
      const newPath = await StorageUser.save(user, fileName);
      const baseUrl = Env.get("APP_ENDPOINT");
      let url =  `${baseUrl}${slash}user_storage${slash}${newPath}`;
      console.log(url, user.id)
      
      await UserPhotos.create({user_id: user.id, url: url});

      return response.status(201).send('saved');
      
    } catch (error) {
      console.log("AAAAA",error)
    }

  }

  /**
   * Display a single userphoto.
   * GET userphotos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing userphoto.
   * GET userphotos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update userphoto details.
   * PUT or PATCH userphotos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    console.log(request.all())
    if (request.input("delete") === true){
      try {
        const photo = await UserPhotos.query().where('id', request.input("id")).first();
  
        let fetched = photo.toJSON()
        console.log(fetched)
  
        const start = fetched.url.indexOf(`${slash}user_storage`);
        const end = fetched.url.length;
        let url = fetched.url.substring(start, end);
        console.log("PATH", url)
  
        FileService.removeFile(`.${slash}public${url}`);
        await UserPhotos.query()
          .where('id', fetched.id)
          .delete()
  
        console.log('deleted', fetched.url)
  
        return response.status(204).send();
      } catch (e) {
        console.log(e)
        return response.status(400).send();
      }  
    
    
    }
    
  
  }

  /**
   * Delete a userphoto with id.
   * DELETE userphotos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy({ params: { id }, response }) {
    try {
      const photo = await UserPhotos.query().where('id', id).with('attachments').first();

      let fetched = classes.toJSON()

      fetched.attachments.map(async(attachment)=>{
        
        const start = attachment.url.indexOf('/storage_user');
        const end = attachment.url.length;
        attachment.url = attachment.url.substring(start, end);

        AttachmentService.removeAttachment(`./public${attachment.url}`);
        await classes
          .attachments()
          .where('id', attachment.id)
          .delete()

        console.log('deleted', attachment.title)

      })
      classes.status = 0;
      await classes.save();
      return response.status(204).send();
    } catch (e) {
      console.log(e)
      return response.status(400).send();
    }
  }
}

module.exports = UserPhotoController
