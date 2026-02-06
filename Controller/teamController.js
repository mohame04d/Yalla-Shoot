const Team = require("./../models/teamModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const User = require("../models/userModel");
const News = require("../models/newsModel");
const Player = require("./../models/playerModel");
const { options } = require("../app");

//Get All Teams
exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find();
  if (teams.length == 0) return next(new appError("not exist any team", 404));
  res.status(200).json({
    status: "success",
    result: teams.length,
    data: { teams },
  });
});

//Get One Team By Id
exports.getOneTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  if (!teamId) return next(new appError("please enter teamId", 400));
  const team = await Team.findById(teamId);
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    data: { team },
  });
});

//Create Team By Admin
exports.createTeam = catchAsync(async (req, res, next) => {
  const team = await Team.create(req.body);
  res.status(201).json({
    status: "success",
    data: { team },
  });
});

//Update Team By Admin
exports.updateTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  const team = await Team.findByIdAndUpdate(teamId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    data: { team },
  });
});

//Delete Team By Admin
exports.deleteTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  const team = await Team.findByIdAndDelete(teamId);
  if (!team) return next(new appError("not exist", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});

//Get Information Of Team
exports.informationOfTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  if (!teamId) return next(new appError("please enter teamId", 400));
  const team = await Team.findById(teamId)
    .populate({
      path: "information.country",
      select: "name logo",
    })
    .populate({
      path: "information.stadium",
      select: "name",
    });
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    data: { information: team.information },
  });
});

exports.addCoachToTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  if (!teamId) return next(new appError("please enter teamId", 400));
  const { coachId } = req.body;
  if (!coachId) return next(new appError("please enter coachId", 400));
  const team = await Team.findByIdAndUpdate(
    teamId,
    {
      $addToSet: { coach: coachId },
    },
    { new: true },
  ).populate({ path: "coach", select: "name avatar" });
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    data: { team },
  });
});
exports.getCoachInTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  if (!teamId) return next(new appError("please enter teamId", 400));
  const team = await Team.findById(teamId).populate({
    path: "coach",
    select: "name avatar",
  });
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    data: { coach: team.coach },
  });
});
exports.deleteCoachFromTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  if (!teamId) return next(new appError("please enter teamId", 400));
  const { coachId } = req.body;
  if (!coachId) return next(new appError("please enter coachId", 400));
  const team = await Team.findByIdAndUpdate(
    teamId,
    {
      $pull: { coach: coachId },
    },
    { new: true },
  ).populate({ path: "coach", select: "name avatar" });
  if (!team) return next(new appError("not exist", 404));
  res.status(200).json({
    status: "success",
    message: "coach deleted successfully",
    data: { coach: team.coach },
  });
});
