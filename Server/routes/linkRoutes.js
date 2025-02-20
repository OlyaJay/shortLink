const express = require('express')
const router = express.Router()
const {createShortLink, redirectToOriginal, getAllLinks, deleteLink} = require("../controllers/linkController")

router.post('/shortURL', createShortLink)
router.get('/allLinks', getAllLinks)
router.delete('/delete/:shortURL', deleteLink)
router.get('/:shortURL', redirectToOriginal)

module.exports = router