const Roadmap = require('../../models/roadmap/roadmapSchema');

const deleteRoadmap = async (req, res) => {
    try {
        await Roadmap.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Roadmap deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete roadmap",
            error: error.message
        });
    }
};

const deleteTopic = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.roadmapId);
        roadmap.topics = roadmap.topics.filter(
            topic => topic._id.toString() !== req.params.topicId
        );
        await roadmap.save();

        res.status(200).json({
            success: true,
            message: "Topic deleted successfully",
            data: roadmap
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete topic",
            error: error.message
        });
    }
};

exports.deleteTopic = deleteTopic;


exports.deleteRoadmap = deleteRoadmap;
