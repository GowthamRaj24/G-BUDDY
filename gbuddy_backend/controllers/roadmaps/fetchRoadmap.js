const Roadmap = require('../../models/roadmap/roadmapSchema');

const getRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id)
            .populate('author', 'name email');

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Roadmap not found",
            error: error.message
        });
    }
};

const getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find()

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            data: roadmaps
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmaps",
            error: error.message
        });
    }
};
// Get roadmaps by category
const getRoadmapsByCategory = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find({ category: req.params.category })
            .populate('author', 'name email');

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            data: roadmaps
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmaps",
            error: error.message
        });
    }
};

const getRoadmapsByDifficulty = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find({ difficulty: req.params.difficulty })
            .populate('author', 'name email');

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            data: roadmaps
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch roadmaps",
            error: error.message
        });
    }
};

exports.getRoadmapsByCategory = getRoadmapsByCategory;
exports.getRoadmapsByDifficulty = getRoadmapsByDifficulty;


exports.getRoadmap = getRoadmap;
exports.getAllRoadmaps = getAllRoadmaps;
