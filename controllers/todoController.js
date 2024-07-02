const Todo = require('../model/todo');


exports.createTask = async(req, res) => {

    const {userId} = req.user.userId

    const { title, description} = req.body;

    if(!userId){
        return res.status(500).json({'message':'Authentication error'});
    }

    if(!title || !description){
        return res.status(400).json({'message': 'Input all fields'})
    }

    try {
        const newTask = await Todo.create(
            req.body
        )

        res.status(201).json({
            status: 'success',
            data: {
                newTask,
            },
        });
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

exports.getTask = async(req,res) => {
    try {
        const task = await Todo.find();

        res.status(200).json({
            status: true,
            data: {
                task
            }
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}