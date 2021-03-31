'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const StorageUser = use("App/Services/StorageUser");
const Helpers = use("Helpers");
const Env = use("Env");

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
      const fileSave = `${path}/${fileName}`;
      await fs.writeFileSync(fileSave, base64Image, { encoding: "base64" });
      const newPath = await StorageUser.save(user, fileName);
      const baseUrl = Env.get("APP_ENDPOINT");
      let url =  `${baseUrl}/user_storage/${newPath}`;
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
  }

  /**
   * Delete a userphoto with id.
   * DELETE userphotos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserPhotoController
