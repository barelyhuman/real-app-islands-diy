/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').unique().primary()
      table.boolean('is_active').notNullable().defaultTo('true')
      table.timestamps(true, true)

      table.string('email').notNullable()
      table.string('password').notNullable()
    })
    .createTable('posts', table => {
      table.increments('id').unique().primary()
      table.boolean('is_active').notNullable().defaultTo('true')
      table.timestamps(true, true)

      table.text('content').notNullable()

      table.integer('user_id').references('id').inTable('users')
    })
    .createTable('tokens', table => {
      table.increments('id').unique().primary()
      table.boolean('is_active').notNullable().defaultTo('true')
      table.timestamps(true, true)

      table.text('access_token').notNullable()
      table.timestamp('expires_at').notNullable()

      table.integer('user_id').references('id').inTable('users')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tokens')
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
}
