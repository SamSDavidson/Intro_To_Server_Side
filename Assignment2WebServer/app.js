

var fs = require("fs");
var path = require("path");
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {

    //capture url
    var parsed = url.parse(req.url)
    var filename = path.parse(parsed.pathname)

    //verify file type of link
    filen = filename.name==""?"index":filename.name;
    ext = filename.ext==""?".html":filename.ext
    dir = filename.dir=="/"?"":filename.dir+"/";
    page = filename.name==""?"index.html":filename.name + filename.ext;

    f = (dir+filen+ext).replace("/","");

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    if(f){
    //path of file and callback in case file not found
    fs.readFile(f, function (err, data) {


        res.writeHead(200); //header() = white kind of file will be written
        //write script that updates across pages
        //res.write("<script>var page ='"+ ??? + "';</script>")
        //200 is okay code
        res.end(data, 'utf-8') //
    })
    }



}).listen("8080")