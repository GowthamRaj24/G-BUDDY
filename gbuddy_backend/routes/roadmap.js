const express = require("express");
const createRoadmap = require("../controllers/roadmaps/addRoadmap");
const getRoadmap = require("../controllers/roadmaps/fetchRoadmap");
const updateRoadmap = require("../controllers/roadmaps/updateRoadmap");
const deleteRoadmap = require("../controllers/roadmaps/deleteRoadmap");
// const middleware = require("../middleware/auth");

const routes = express.Router();

routes
    .post("/createRoadmap", createRoadmap.createRoadmap)
    .post("/roadmap/:id/topic", createRoadmap.addTopic)
    .get("/roadmaps", getRoadmap.getAllRoadmaps)
    .get("/roadmap/:id", getRoadmap.getRoadmap)
    .get("/roadmaps/category/:category", getRoadmap.getRoadmapsByCategory)
    .get("/roadmaps/difficulty/:difficulty", getRoadmap.getRoadmapsByDifficulty)
    .patch("/roadmap/:id", updateRoadmap.updateRoadmap)
    .patch("/roadmap/:roadmapId/topic/:topicId", updateRoadmap.updateTopic)
    .delete("/roadmap/:id", deleteRoadmap.deleteRoadmap)
    .delete("/roadmap/:roadmapId/topic/:topicId", deleteRoadmap.deleteTopic);

exports.route = routes;
