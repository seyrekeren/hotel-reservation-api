const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    const { username, password, email } = req.body; ö
    try {
        const user = await User.findOne(email)
        if (user) return res.status(500).json({ message: "böyle bir kullanıcı yok" });
        if (password.length < 6) return res.status(500).json({ message: "paralonız çok kısa" });
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await User.create({ ...req.body, password: passwordHash })

        const token = await jwt.sign({ id: newUser._id, isAdmin: newUser._sAdmin }, "secret key")

        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            newUser
        })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const login = async (req, res, next) => {
    const { username, password, email } = req.body; ö
    try {
        const user = await User.findOne(email)
        if (!user) return res.status(500).json({ message: "böyle bir kullanıcı bulunamadı" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            res.status(500).json({ message: 'şifre yanlış' })
        }

        const token = await jwt.sign({ id: user._id, isAdmin: user._sAdmin }, "secret key")

        res.cookie("token", token, { httpOnly: true }).status(200).json({
            token,
            user
        })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = {register, login};