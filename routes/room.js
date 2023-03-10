const express = require('express');
const { getAllRoom, getDetailRoom, deleteRoom, updateRoom, createRoom } = require('../controllers/room');
const {verifyAdmin} = require('../middleware/verify.js')

const router = express.Router();


router.get('/getAllRoom', getAllRoom);
router.get('/getDetailRoom/:id', getDetailRoom);
router.delete('/deleteRoom/:id', verifyAdmin, deleteRoom);
router.put('/updateRoom/:id', verifyAdmin, updateRoom);
router.post('/createRoom/:id/:hotelid', verifyAdmin, createRoom)


module.exports = router;