const express = require('express')
const app = express()
const port = 3000
const CryptoJS = require('crypto-js')
const fs = require('fs')
const { exit } = require('process')
const bodyParser = require('body-parser')
const path = require('path')
const axios = require('axios')
const open = require('open');

var cword;
var arr;

axios
  .get('https://gist.github.com/jeel279/8e722963f3dd53e55cde4637004c2de3/raw/826fc19dabd2cd75f107d06fdb25e90ccd4ca3eb/word5list')
  .then(res => {
    arr = res.data.split('\n');
  })
  .catch(error => {
    console.error(error)
  })


app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/public/app.html")
  cword = arr[parseInt((Math.random()*10000)) % arr.length]
  console.log(cword)
  var str = "";
  for(i in cword) str+=CryptoJS.SHA1(cword[i]);
  res.setHeader("Set-Cookie","ver="+cword)    
  
})

app.post('/isValid',(req,res)=>{
    if(arr.includes(req.body["word"])){
        res.send(true);
        res.end()
        return;
    }
    res.send(false);
    res.end();
    return;
})
app.listen(port || process.env.port,()=>{
  console.log("Running On Port 3000");
})

