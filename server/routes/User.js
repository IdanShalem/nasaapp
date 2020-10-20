const   express     = require('express'),
        router      = express.Router(),
        User        = require('../models/User'),
        jwt         = require('jsonwebtoken'),
        bcrypt      = require('bcryptjs'),
        auth        = require('../middleware/auth')

router.post(`/register`,async function(req,res){
    try{
        const { email, password, firstName, lastName } = req.body
        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({msg: "Not all fields have been enterd"})
        }

        const isUserExists = await User.findOne({ email })
        if(isUserExists){
            return res.status(400).json({msg:'account alredy exists'})
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User({email, password: hashPassword, firstName, lastName })
        await user.save()
        res.send(user)

    } catch(err){
        res.status(500).json(err);
    }
})

router.post(`/login`,async function(req,res){
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({msg: "Not all fields have been enterd"})
        }

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({msg:'Something is wrong'})
        }

        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({msg:'Something is wrong'})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                transactions: user.transactions
            }
        })

    } catch(err){
        res.status(500).json(err)
    }
})

router.delete('/delete', auth, async function(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId)
        res.json(deletedUser)
    } catch(err){
        res.status(500).json(err)
    }
})

router.post('/tokenIsValid', async function(req, res) {
    try {
        const token = req.header('x-auth-token')
        if(!token) {
            res.json(false3)
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) {
            res.json(false)
        }

        const user = await User.findById(verified.id)
        if(!user) {
            return res.json(false)
        }

        return res.json(true)
    } catch(err){
        res.status(500).json(err)
    }
})

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
    });
})


module.exports = router