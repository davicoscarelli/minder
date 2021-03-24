"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.get("me", "UserController.index").as("auth.me");
  // Route.post("login", "AuthController.login").as("auth.login");
  // Route.post("refresh", "AuthController.refresh").as("auth.refresh");
  // Route.post("logout", "AuthController.logout").as("auth.logout");
  // Route.post("me", "AuthController.me").as("auth.me");

  // restore password route methods
  //   Route.post('reset-password', 'AuthController.forgot').as('auth.forgot')
  //   Route.get('reset-password', 'AuthController.remember').as('auth.remember')
  //   Route.put('reset-password', 'AuthController.reset').as('auth.reset')
})
  .prefix("v1/auth")
  .namespace("Auth");
