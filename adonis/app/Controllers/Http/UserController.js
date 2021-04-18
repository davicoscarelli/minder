'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const StorageUser = use("App/Services/StorageUser");
const Helpers = use("Helpers");
const Env = use("Env");

const Database = use("Database");
const User = use("App/Models/User");
const fs = require("fs");

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
  async index ({ request, response, auth }) {
    try {
      const loggedUser = await auth.getUser();
      
      let blackList = [loggedUser.id].concat(JSON.parse(loggedUser.likes), JSON.parse(loggedUser.dislikes)).filter(Number)
      
      const users = await User.query()
        .whereNotIn("id", blackList)
        .with("photos")
        .paginate()
      
      let allUsers = users.toJSON()
      console.log("TEM GENTE", allUsers.data.length)
      if (allUsers.data.length == 0){
        loggedUser.dislikes = JSON.stringify([])
        await loggedUser.save();
        blackList = [loggedUser.id].concat(JSON.parse(loggedUser.likes)).filter(Number)
      

        const newUsers = await User.query()
        .whereNotIn("id", blackList)
        .with("photos")
        .paginate()
        
        return response.send(newUsers);
      }else{
        
        return response.send(allUsers);

      }
      
    
    } catch (error) {
      console.log(error)
    }

    }

    
    async like({ request, response, auth }) {
      try {
        const loggedUser = await auth.getUser();
        console.log("LIKEEE", request.all(), loggedUser)
        
        const targetUser = await User.findBy("id", request.input("target_user"));
      
        if (!targetUser) {
          return response.status(404).send('User do not exists');
        }

        if (loggedUser.likes && loggedUser.likes.length > 0){
          let likes = JSON.parse(loggedUser.likes)
          likes.push(targetUser.id);
          loggedUser.likes = JSON.stringify(likes)
        }else{
          loggedUser.likes = JSON.stringify([targetUser.id]);
          
        }


        
        if (targetUser.likes.includes(loggedUser.id)) {
 
          let userMatches = [targetUser.id].concat(JSON.parse(loggedUser.matches))
          let targetMatches = [loggedUser.id].concat(JSON.parse(targetUser.matches))
          console.log("MATCHH user", userMatches)
          console.log("MATCHH tarrget", targetMatches)
          loggedUser.matches = JSON.stringify(userMatches)
          targetUser.matches = JSON.stringify(targetMatches)
          await targetUser.save();
          await loggedUser.save();

          let matches = JSON.parse(userMatches)

          let matchesUsers = await User.query().whereIn('id', matches).with('photos').fetch()

          return response.send({user: loggedUser.toJSON(), target: targetUser.toJSON(), matchesUsers: matchesUsers});  
        }else{
          await loggedUser.save();
          return response.send(loggedUser.toJSON());
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }
    
    async dislike ({ request, response, auth }) {

      const loggedUser = await auth.getUser();
      
      
      const targetUser = await User.findBy("id", request.input("target_user"));
    
      if (!targetUser) {
        return response.send('User do not exists');
      }
      if (loggedUser.dislikes && loggedUser.dislikes.length > 0){
        let dislikes = JSON.parse(loggedUser.dislikes)
        dislikes.push(targetUser.id);
        loggedUser.dislikes = JSON.stringify(dislikes)
      }else{
        loggedUser.dislikes = JSON.stringify([targetUser.id]);
      }

      await loggedUser.save();

      return response.send(loggedUser.toJSON());
        
    }

    async getMatches({ response, auth }){
      try {
        const loggedUser = await auth.getUser();
        let matches = JSON.parse(loggedUser.matches)

        let matchesUsers = await User.query().whereIn('id', matches).with('photos').fetch()

        let allmatches = matchesUsers.toJSON()
        allmatches.map((match) => {
          match.photos.map((photo)=>{
            photo.name = match.photos.indexOf(photo)
          })
        })

        return response.send({matches: matches, matchesUsers: allmatches});  
      } catch (error) {
        console.log(error)
      }
      
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
          .with('photos')
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
  async update ({ params, request, response, auth }) {
    try{
      const allRequest = request.all();

      let avatar_url =  ''

      let slash = "\\"
      
      const loggedUser = await auth.getUser();

      const user = ModelHelper.fillable(allRequest, [...User.fillable, "id"]);
      
      const userToUpdate = await User.find(user.id);

      const avatar = request.input("avatar");
      if (avatar && avatar.size != undefined) {

          var image = avatar.photo;
          const path = Helpers.publicPath("tmp");
          const fileName = new Date().getTime() + ".png";
          let base64Image = image.split(";base64,").pop();
          const fileSave = `${path}${slash}${fileName}`;
          await fs.writeFileSync(fileSave, base64Image, { encoding: "base64" });
          const newPath = await StorageUser.save(loggedUser, fileName);
          const baseUrl = Env.get("APP_ENDPOINT");
          avatar_url =  `${baseUrl}${slash}user_storage${slash}${newPath}`;
          user.avatar = avatar_url;

          let userCurrentAvatar = loggedUser.avatar;
          if (userCurrentAvatar != null ) {
            const start = userCurrentAvatar.indexOf('${slash}user_storage');
            const end = userCurrentAvatar.length;
            userCurrentAvatar = userCurrentAvatar.substring(start, end);
            StorageUser.removeFile(`.${slash}public${userCurrentAvatar}`);
            
          } 
        
      }

      userToUpdate.merge(user);

      await userToUpdate.save();

      

      const userUpdated = await User.find(user.id);
      
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
