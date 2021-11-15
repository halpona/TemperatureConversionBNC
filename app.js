const express = require("express")
const path = require('path')

const app = express();

app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/js', express.static(path.join(__dirname, 'public/scripts')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});

// export function hello() {
//     return "world";
// }

//const hh = require('')
function helloW  (r, a, s) {
    return "wo" + r;
}

app.post('/test', function(req, res) {
    console.log('TEST');
    console.log(req);
    console.log(res);
    return 'HELLOTEST';
})

module.exports = {helloW};