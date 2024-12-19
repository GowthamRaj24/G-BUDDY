const express = require("express");
const createRoadmap = require("../controllers/roadmaps/addRoadmap");
const getRoadmap = require("../controllers/roadmaps/fetchRoadmap");
const updateRoadmap = require("../controllers/roadmaps/updateRoadmap");
const deleteRoadmap = require("../controllers/roadmaps/deleteRoadmap");
const middleware = require("../middleware/auth");

const routes = express.Router();

routes
    .post("/createRoadmap",middleware.auth, createRoadmap.createRoadmap)
    .post("/roadmap/:id/topic",middleware.auth, createRoadmap.addTopic)
    .get("/roadmaps", middleware.auth,getRoadmap.getAllRoadmaps)
    .get("/roadmap/:id",middleware.auth, getRoadmap.getRoadmap)
    .get("/roadmap/user/:userId",middleware.auth, getRoadmap.getRoadmapsByUser)
    .get("/roadmaps/category/:category",middleware.auth, getRoadmap.getRoadmapsByCategory)
    .get("/roadmaps/difficulty/:difficulty", middleware.auth,getRoadmap.getRoadmapsByDifficulty)
    .patch("/roadmap/:id", middleware.auth,updateRoadmap.updateRoadmap)
    .patch("/roadmap/:roadmapId/topic/:topicId", middleware.auth,updateRoadmap.updateTopic)
    .delete("/roadmap/:id",middleware.auth, deleteRoadmap.deleteRoadmap)
    .delete("/roadmap/:roadmapId/topic/:topicId", deleteRoadmap.deleteTopic);

exports.route = routes;
