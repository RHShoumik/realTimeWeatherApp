const express = require("express");
const https = require("https");
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))


app.get("/" ,(req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) =>{
    
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "d18f3ed4849533e436a0e834ff7740ee";


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&exclude=hourly,daily&units=metric`;
    console.log(url);
    https.get(url , (response) =>{
        console.log(response.statusCode);
        response.on("data" , (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            res.write(`<p> Weather Description : ${weatherData.weather[0].description} </>`);
            res.write(`<h1>The temprature in ${query} is ${temp} deg</h1>`)
            res.write(`<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" />`)
            res.send();
        })
    })

});


app.listen(port , (req, res) =>{
    console.log("Server is running on port " + port);
});