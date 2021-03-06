'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPhotoSchema extends Schema {
  up () {
    this.create('user_photos', (table) => {
      table.increments()
      table.integer("user_id")
      table.text("url")
      table.timestamps()

      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
    })
  }

  down () {
    this.drop('user_photos')
  }
}

module.exports = UserPhotoSchema
