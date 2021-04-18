'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('age')
      table.integer('class')
      table.string('country', 100)
      table.string('bio', 255)
      table.text('tags')
      table.string('instagram')
      table.string('telegram')
      table.text("avatar")
      table.text("folder")
      table.text("likes")
      table.text("dislikes")
      table.text("matches")
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
