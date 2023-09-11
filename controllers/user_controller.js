const UserModel = require('../models/user_model');


const createUser = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "you have some empty fields" }); // 400 is bad request
    }
    const user = new UserModel(req.body);
    await user.save().then((data) => {
        // res.send({
        //     message: "User created Successfully",
        //     userInfo: data
        // })
        res.redirect('/');
    }).catch((error) => {
        res.status(500).send({
            message: error || "some error occurred while creating the user"
        })
    });
}

const getAllUsers = async (req, res) => {
    await UserModel.find().then((users) => {
        res.status(200).render('index',{'users' : users});
    }).catch((error) => {
        res.status(404).send({
            message: error.message
        })
    });
}
const getUser = async (req, res) => {
    await UserModel.findById(req.params.id).then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(404).send({
            message: error.message
        })
    });
}

const updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "you have some empty fields" });
    }
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then((data) => {
        if (data) {
            res.send({
                message: "user updated successfully"
            })
        }
        else {
            res.status(404).send({ message: "user not found" });
        }
    }).catch((error) => {
        res.status(500).send({
            message: error.message
        })
    });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).then((data) => {
        if (data) {
            // res.send({
            //     message: "user deleted successfully"
            // })
            res.redirect('/');
        }
        else {
            res.status(404).send({ message: "user not found" });
        }
    }).catch((error) => {
        res.status(500).send({
            message: error.message
        })
    });
}



module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}