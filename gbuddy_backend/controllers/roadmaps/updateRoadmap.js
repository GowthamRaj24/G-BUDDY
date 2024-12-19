const Roadmap = require('../../models/roadmap/roadmapSchema');

const updateRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update roadmap",
            error: error.message
        });
    }
};

const updateTopic = async (req, res) => {
    try {
        const roadmap = await Roadmap.findOneAndUpdate(
            { "_id": req.params.roadmapId, "topics._id": req.params.topicId },
            { "$set": { "topics.$": req.body }},
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update topic",
            error: error.message
        });
    }
};

exports.updateTopic = updateTopic;


exports.updateRoadmap = updateRoadmap;
