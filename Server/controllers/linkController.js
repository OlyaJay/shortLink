const {nanoid} = require('nanoid')
const {readLinks, writeLinks} = require('../utils/fileHelper')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

exports.createShortLink = async (req, res) =>{
    const {originURL} = req.body

    if(!originURL){
        return res.status(400).json({error: "Error text"})
    }

    const links = await readLinks()
    const shortId = nanoid(6)
    const newLink = {originURL, shortId, clicks: 0}

    links.push(newLink)
    
    await writeLinks(links)
    res.json({shortURL: `${BASE_URL}/${shortId}`})
}

exports.redirectToOriginal = async (req, res) => {
    const {shortURL} = req.params
    const links = await readLinks()
    const link = links.find((item)=>item.shortId === shortURL)

    if(!link){
        return res.status(404).json({error: "Not found"})
    }

    link.clicks += 1
    await writeLinks(links)
    res.redirect(link.originURL)
}

exports.getStats = async (req, res) =>{
    const {shortURL} = req.params
    const links = await readLinks()
    const link = links.find((item)=>item.shortId === shortURL)

    if(!link){
        return res.status(404).json({error: "Not found"})
    }

    res.json({originURL: link.originURL, shortURL:`${BASE_URL}/${link.shortId}`, clicks: link.clicks})
}

exports.getAllLinks = async (req, res) =>{
    const links = await readLinks()
    res.json(links)
}

exports.deleteLink = async (req, res) =>{
    const {shortURL} = req.params
    const links = await readLinks()

    if(!links) return res.status(404).json({error: "No items"})

    const newLinks = links.filter((item)=>item.shortId !== shortURL)

    if(newLinks.length === links.length) return res.status(404).json({error: "Not found"})
    
    await writeLinks(newLinks)
    res.json({message: "Delete link"})
}