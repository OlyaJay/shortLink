const fs = require("fs-extra")
const path = require('path')
const filePath = path.join(__dirname, "../data/links.json")

const readLinks = async () =>{
    try{
        const data = await fs.readFile(filePath, "utf-8")
        const links = JSON.parse(data)
        return Array.isArray(links) ? links : []
    } catch(error){
        if(error.code === "ENOENT") {
            await fs.writeFile(filePath, "[]")
            return []
        }
        throw error
    }
}

const writeLinks = async (data) =>{
    await fs.writeJSON(filePath, data, {spaces: 2})
}

module.exports = {readLinks, writeLinks} 