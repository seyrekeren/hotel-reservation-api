const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const createHotel = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}


const updateHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        await Hotel.findByIdAndDelete(id);
        res.status(201).json({ message: 'silme işlemi başarılı' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getSingleHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getAllHotel = async (req, res) => {
    const { min, max, ...others } = req.query
    try {
        const hotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max | 999 }
        }).limit(req.query.limit)
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const typeByCount = async (req, res) => {
    try {
        const hotel = await Hotel.countDocuments({ type: "hotel" })
        const villa = await Hotel.countDocuments({ type: "villa" })
        res.send(200).json[
            { type: 'hotel,', count: hotel },
            { type: 'villa', count: villa }
        ]
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const typeByCity = async (req, res) => {
    try {
        const cities = req.query.cities.split(",");

        const hotel = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.send(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


module.exports = { typeByCity, typeByCount, getAllHotel, createHotel, getSingleHotel, deleteHotel, updateHotel };