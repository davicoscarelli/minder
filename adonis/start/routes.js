'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource("clients", "UserController").apiOnly();
Route.get("myaccount", "UserController.show").as("myaccount");

Route.group(() => {
    Route.post("login", "AuthController.login").as("auth.login");
    // Route.post("refresh", "AuthController.refresh").as("auth.refresh");
    Route.post("logout", "AuthController.logout").as("auth.logout");
    // Route.post("me", "AuthController.me").as("auth.me");
  }).prefix("/auth")
