const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getUsers, getUsersId, createUser, updateProfile, updateAvatar } = require('../controllers/users.js')

router.get('/:id', getUsersId);

router.get('/', getUsers);

router.post('/', createUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);


module.exports = router;