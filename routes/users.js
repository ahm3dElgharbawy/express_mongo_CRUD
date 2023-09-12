var express = require('express');
var router = express.Router();
const usersController = require('../controllers/user_controller');

/* GET users listing. */


router.get('/', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);

router.get('/views/create',(req,res)=>{
    res.render('create_user');
});
router.get('/views/update',(req,res)=>{
    res.render('update_user');
});
router.post('/create',usersController.createUser);
router.post('/update/:id', usersController.updateUser);
router.get('/delete/:id', usersController.deleteUser);



module.exports = router;
