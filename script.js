// import the http and file system modules
const http = require('http')
const fs = require('fs')

// this is the url to fetch the placeholder posts from
let url = 'http://jsonplaceholder.typicode.com/posts'

// I'm using the built in get method that comes with node.js
http.get(url, function (res) {

    // we'll store all the data recieved in this variable
    let data = ''

    // this is always called whenever some data arrives.
    // So we'll keep adding up or appending the new data 
    // to the one we already have.
    res.on('data', function (chunkOfData) {
        data = data + chunkOfData
    })

    // this will be called after we've received all the data
    // i.e there'll be no more new data arriving.
    res.on('end', function () {

        // Now it is safe to write write all the recived data to posts.json
        // if there's any error, stop the application and display the error message
        // otherwise print a success message.
        fs.writeFile('result/posts.json', data, function (err) {
            if (err) throw err
            console.log('Successfully wrote the posts to result/posts.json')
        })
    })

    // this will get called if there's an error while making the get request
    // e.g no internet, incorrect url, etc.
}).on('error', function (err) {
    console.log('Couldn\'t make the request.\n' +
        'If you\'re properly connceted to the internet,' +
        ' please make sure the url is correct.\n' +
        'If the problem persists, then the site at that url may be down.\n\n' +
        'This is the error:\n', err)
})