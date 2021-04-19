"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Transformer */


/** @type {typeof import('../../../Models/User')} */
const User = use("App/Models/User");




class AuthController {
  /**
   * make auth login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * @param {Transformer} ctx.transform
   */
  async login({ request, response, auth }) {
    try {
      console.log(request.all())
      
      const { email, password } = request.all();
      const user = await User.query().where("email", email).first();
      
      if (user.id){
        const tokens = await auth.withRefreshToken().attempt(email, password);

        let matches = JSON.parse(user.matches)
        let matchesUsers = await User.query().whereIn('id', matches).with('photos').fetch()

        console.log("tudo ok", matchesUsers.toJSON())
      
        return response.send({ tokens, user, matchesUsers });
        
      }else{
        console.log("tudo n ok")
        return response.status(400).send("invalidCredentials");
      }

      
    } catch (error) {
      console.log(error);
      return response.status(400).send("invalidCredentials");
    }
  }

  /**
   * make auth refresh
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * @param {Transformer} ctx.transform
   */
  // async refresh({ request, response, auth, transform }) {
  //   try {
  //     const refreshToken =
  //       request.input("refresh_token") || request.header("refresh_token");

  //     /** refreshing token */
  //     const tokens = await auth
  //       .newRefreshToken()
  //       .generateForRefreshToken(refreshToken);

  //     /** getting uid from new token payload */
  //     const payload = tokens.token.split(".")[1];
  //     const buff = Buffer.from(payload, "base64");
  //     const { uid } = JSON.parse(buff.toString("utf-8"));

  //     /** getting user data */
  //     const refreshed = await User.find(uid);
  //     const user = await transform.item(refreshed, UserTransformer);
  //     user.roles = await refreshed.getRoles();

  //     return response.send({ tokens, user });
  //   } catch (error) {
  //     return response.status(400).send(RH.msg("users.invalidToken"));
  //   }
  // }

  /**
   * make auth logout
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async logout({ request, response, auth }) {
    try {
      const refreshToken =
        request.input("refresh_token") || request.header("refresh_token");

      await auth.authenticator("jwt").revokeTokens([refreshToken], true);
      return response.status(204).send({});
    } catch (error) {
      return response.status(500).send(RH.msg("errors.serverError"));
    }
  }

  /**
   * Get the authenticated user
   * @param {object} ctx
   * @param {Transformer} ctx.transform
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  // async me({ transform, response, auth }) {
  //   try {
  //     let user = await auth.getUser();
  //     let userData = await transform.item(user, UserTransformer);
  //     userData.roles = await user.getRoles();
  //     return response.send(userData);
  //   } catch (error) {
  //     return response.status(400).send(RH.msg("users.invalidToken"));
  //   }
  // }
}

module.exports = AuthController;
