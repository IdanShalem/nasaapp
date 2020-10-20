const   express     = require('express'),
        router      = express.Router()
        Image = require('../models/Image')


router.get('/:imgId?' , async function(req, res) {
    const {imgId} = req.params
    let result
    imgId
        ? result = await Image.findOne({ _id: imgId })
        :  result = await Image.find({})
    res.send(result)
})

router.post('/save', async function(req, res) {  
    const image = new Image(req.body)
    await image.save()
    res.send(image)
})

router.delete('/:imageId', async function(req, res) {
    const { imageId } = req.params
    const image = await Image.findByIdAndDelete(imageId)
    res.send(image)
})

module.exports = router