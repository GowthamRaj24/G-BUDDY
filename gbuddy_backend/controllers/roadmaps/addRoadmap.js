const Roadmap = require('../../models/roadmap/roadmapSchema');

const createRoadmap = async (req, res) => {
    try {
        // console.log(req.body);

        const roadmap = await Roadmap.create(req.body);

        res.status(201).json({
            success: true,
            data: roadmap
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to create roadmap",
            error: error.message
        });
    }
};

exports.createRoadmap = createRoadmap;



const addTopic = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id);
        roadmap.topics.push(req.body);
        await roadmap.save();

        res.status(201).json({
            success: true,
            data: roadmap
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add topic",
            error: error.message
        });
    }
};

exports.addTopic = addTopic;
