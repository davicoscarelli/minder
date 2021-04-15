'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


const Env = use("Env");

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden() {
    return ["password", "likes", "dislikes"];
  }

  static get fillable() {
    return [
      "name",
      "avatar",
      "email",
      "password",
      "likes",
      "dislikes"
    ];
  }
  static get computed() {
    return ["avatar_url"];
  }

  getAvatarUrl(user) {
    const { avatar } = user;
    if (avatar && avatar.search("http") !== -1) return avatar;
    const baseUrl = Env.get("APP_ENDPOINT");
    return `${baseUrl}/user_storage/${avatar}`;
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  photos () {
    return this.hasMany('App/Models/UserPhotos')
  }

  
}

module.exports = User
