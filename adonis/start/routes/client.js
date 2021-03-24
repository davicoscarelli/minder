"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");

const Route = use("Route");

Route.group(() => {
  Route.resource("clients", "UserController").apiOnly();
  // // Route.put("clients/:id", "UserController.update").as("update");
  // Route.post("confirmemail", "UserController.confirmEmail").as("confirmEmail");
  // Route.get("verifyemail/:email", "UserController.verifyEmail").as("verifyEmail");
  // Route.post("verifypassword", "UserController.verifyPassword").as("verifyPassword");
  // Route.put("deactivate", "UserController.deactivate").as("deactivate");
  
  // Route.get("checkadmin", "UserController.checkAdmin").as("checkadmin");

  // Route.get("myaccount", "MyAccountController.show").as("myaccount");
  // Route.get("myaccount/paymentstatus", "MyAccountController.paymentStatus").as("paymentstatus");
  // Route.get("timezones", "TimezoneController.index").as("timezones");

  // Route.get("userplan", "UserPlanController.index");
  // Route.get("userplan/status", "UserPlanController.paymentStatus");
  // Route.put("userplan/cancel", "UserPlanController.cancelPlan");
  // Route.put("userplan/changecard/:id", "UserPlanController.changeCard");
  // Route.get("userplan/:id", "UserPlanController.show");
  // Route.put("userplan/:id", "UserPlanController.update");
  // Route.post("userplan", "UserPlanController.store");

  // Route.post("access-recover-request", "UserController.recoverRequest").as("recoverRequest");
  
 
})
  .prefix("v1")
  .namespace("Client");
