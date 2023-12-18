let express = require("express")
let path = require("path")
let app = express()
let multer = require("multer")
let upload = multer({dest : "uploads/"})
let {jpg} = require("./merge")
app.use("/static", express.static("public"))
let port = 1000
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "index/index.html"))
})
app.post("/merge", upload.array("jpgs", []), async(req,res,next)=>{
    try {
        let a = await jpg(
            req.files
        )
        let b = path.basename(a)
        res.redirect(`/static/${b}`)
    } catch (error) {
        res.status(500).send("<h1>Error is showing. Beacuse you have not uploaded the Image file on the side. Upload the Image file first, only then the error will not occur. And the extension of the file should be .jpg, .jpeg, .png, .gif, .bmp <br>Thanks...</h1>")
    }
})
app.listen(port, ()=>{
    console.log(`click http://localhost:${port}`)
})