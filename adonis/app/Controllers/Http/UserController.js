'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");
const User = use("App/Models/User");

const ModelHelper = require("../../Helpers/ModelHelper");
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    response.send("vrau")
  }

  

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let newUser = request.all()
      console.log(newUser)    
      const user = await User.create(newUser);

      return response.status(201).send(user);
      
    } catch (error) {
      console.log(error)
    }
    
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show({ response, auth }) {
    try {
      let user = await auth.getUser();
      if (user){
        user = await User.query()
          .where("id", user.id)
          .first();

        return response.send(user);

      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      const allRequest = request.all();
      
      const user = ModelHelper.fillable(allRequest, [...User.fillable, "id"]);
      console.log(user)
      const userToUpdate = await User.find(user.id);

      userToUpdate.merge(user);

      await userToUpdate.save();

      

      const userUpdated = await User.find(user.id);
      console.log(userUpdated)

      return response.status(201).send(userUpdated);

    }catch(e){
      console.log(e)
      trx.rollback();
      return response.status(400).send('notUpdated');
    }
    
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
