const express = require("express");
const router = express.Router();
const authController = require("./../Controller/authController");
const teamController = require("./../Controller/teamController");
router.use(authController.protect)
router
  .route("/")
  .get(teamController.getAllTeams)
  .post(authController.restrict("admin"), teamController.createTeam);
router
  .route("/:id")
  .get(teamController.getOneTeam)
  .patch(authController.restrict("admin"), teamController.updateTeam)
  .delete(authController.restrict("admin"), teamController.deleteTeam);
router.route("/informationOfTeam/:id").get(teamController.informationOfTeam);
router
  .route("/addCoachToTeam/:id")
  .patch(authController.restrict("admin"), teamController.addCoachToTeam);
router.route("/coachInTeam/:id").get(teamController.getCoachInTeam);
router
  .route("/deleteCoachFromTeam/:id")
  .patch(authController.restrict("admin"), teamController.deleteCoachFromTeam);
module.exports = router;  