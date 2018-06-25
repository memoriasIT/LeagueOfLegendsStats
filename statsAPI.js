//Using the API
var request = require("request")

//Values from main window
var username = 'Froggen'
var api = '?api_key=' + 'RGAPI-70d979ac-89e3-411d-95bc-30aa65d00d63'
var userid;

//NAME, LVL AND IMAGE REQUEST
var url2 = "https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + username + api;
request({
    url: url2,
    json: true
}, function (error, response, body, callback) {
    if (!error && response.statusCode === 200) {
        var toParse = body;
        var name = toParse['name'];
        var userid = toParse['id'];
        var level = toParse['summonerLevel'];


        var div = document.getElementById("wrapper");
        var nestedDiv = document.getElementById("name");
        nestedDiv.textContent = name + " - lvl:" + level;

        var img = document.createElement("img");
        img.src = 'http://avatar.leagueoflegends.com/euw1/' + username + '.png';
        img.height = '128';
        var src = document.getElementById("icon");
        src.appendChild(img);


        var url = "https://euw1.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/" + userid + api;
        var leagueurl = "https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + userid + api;
        var bestchamps = "https://euw1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + userid + api;

        //LEAGUE REQUEST
        request({
            url: leagueurl,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var toParse = body;
                var tier = toParse[0].tier;
                var rank = toParse[0].rank;
                var lp = toParse[0].leaguePoints;

                var wins = toParse[0].wins;
                var losses = toParse[0].losses;

                var div = document.getElementById("wrapper");
                var nestedDiv = document.getElementById("league");
                nestedDiv.textContent = tier + " " + rank + "; " + lp + 'LP';

                var div = document.getElementById("wrapper");
                var nestedDiv = document.getElementById("results");
                nestedDiv.textContent = 'W: ' + wins + "- L: " + losses;
            }
        })
        //*- End of league and wins request-*


        //Best Champs
        request({
            url: bestchamps,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var toParse = body;
                var champIDs = [toParse[0].championId, toParse[1].championId, toParse[2].championId];
                var champLVLs = [toParse[0].championLevel, toParse[1].championLevel, toParse[2].championLevel];
                var champPoints = [toParse[0].championPoints, toParse[1].championPoints, toParse[2].championPoints];

                //id to name
                console.log('Numero de champs: ' + champIDs.length) // == 3
                console.log('ID1: ' + champIDs[0])
                console.log('ID2: ' + champIDs[1])
                console.log('ID3: ' + champIDs[2])

                //Champ 0
                request({
                    url: 'https://BR1.api.riotgames.com/lol/static-data/v3/champions/' + champIDs[0] + api,
                    json: true
                }, function (error, response, body) {
                    console.log(response) //429 - Rate limit exceeded
                    //200 - Okay
                    if (!error && response.statusCode === 200) {
                        var toParse = body;
                        var name = toParse['name'];
                        console.log('Nombre:' + name)

                        var canvas = document.getElementById('myCanvas');
                        var context = canvas.getContext('2d');
                        var img = new Image();
                        img.height = 32;
                        img.onload = function () {
                            //Rectangle
                            context.save();
                            context.lineWidth = 0;
                            context.strokeStyle = "rgba(1, 1, 1, 0)";
                            context.fillStyle = "#ffffff";
                            context.beginPath();
                            context.moveTo(60, 20);
                            context.lineTo(120, 20);
                            context.quadraticCurveTo(140, 20, 140, 40);
                            context.lineTo(140, 30);
                            context.quadraticCurveTo(140, 50, 120, 50);
                            context.lineTo(60, 50);
                            context.quadraticCurveTo(40, 50, 40, 30);
                            context.lineTo(40, 40);
                            context.quadraticCurveTo(40, 20, 60, 20);
                            context.closePath();
                            context.fill();
                            context.stroke();
                            context.restore();

                            //IMAGE + ARC
                            context.save();
                            context.beginPath();
                            context.arc(35, 35, 25, 0, 2 * Math.PI);
                            context.clip();
                            context.drawImage(img, 0, 0, 64, 64);
                            context.closePath();
                            context.restore();

                            //Text
                            // context.save();
                            // context.font="11px Verdana";
                            // context.strokeText('M'+champLVLs[0]+ "- " + parseFloat(champPoints[0]/1000).toFixed(2)+"k" + '                        M'+champLVLs[1]+ "- " + parseFloat(champPoints[2]/1000).toFixed(2)+"k"+ '                        M'+champLVLs[1]+ "- " + parseFloat(champPoints[2]/1000).toFixed(2)+"k",64,39); 
                            // console.log('M'+champLVLs[0]+ "- " + parseFloat(champPoints[0]/1000).toFixed(2)+"k");
                            // context.restore();
                        }
                        img.src = 'https://ddragon.leagueoflegends.com/cdn/8.12.1/img/champion/' + name + '.png';
                        // img.src = 'https://ddragon.leagueoflegends.com/cdn/8.12.1/img/champion/Quinn.png';
                    }
                })
                //Champ 1
                request({
                    url: 'https://BR1.api.riotgames.com/lol/static-data/v3/champions/' + champIDs[1] + api,
                    json: true
                }, function (error, response, body) {
                    console.log(response)   //429 - Rate limit exceeded
                    //200 - Okay
                    if (!error && response.statusCode === 200) {
                        var toParse = body;
                        var name = toParse['name'];
                        console.log('Nombre:' + name)

                        var canvas = document.getElementById('myCanvas');
                        var context = canvas.getContext('2d');

                        //Rectangle     
                        context.fillStyle = "#ffffff";
                        context.strokeStyle = "rgba(1, 1, 1, 0)";
                        context.beginPath();
                        context.moveTo(205, 20);
                        context.lineTo(265, 20);
                        context.quadraticCurveTo(285, 20, 285, 40);
                        context.lineTo(285, 30);
                        context.quadraticCurveTo(285, 50, 265, 50);
                        context.lineTo(205, 50);
                        context.quadraticCurveTo(185, 50, 185, 30);
                        context.lineTo(185, 40);
                        context.quadraticCurveTo(185, 20, 205, 20);
                        context.closePath();
                        context.fill();
                        context.stroke();
                        context.restore();

                        //image
                        var img = new Image();
                        img.height = 32;
                        img.onload = function () {
                            context.save();
                            context.beginPath();
                            context.arc(180, 35, 25, 0, 2 * Math.PI);
                            context.clip();
                            context.drawImage(img, 145, 0, 64, 64);
                            context.closePath();
                            context.restore();


                            // //Text
                            // context.save();
                            // context.font="11px Verdana";
                            // context.strokeText('M'+champLVLs[1]+ "- " + parseFloat(champPoints[1]/1000).toFixed(2)+"k",145+64,39);
                            // context.restore(); 
                            // console.log('M'+champLVLs[1]+ "- " + parseFloat(champPoints[1]/1000).toFixed(2)+"k");

                        }
                        img.src = 'https://ddragon.leagueoflegends.com/cdn/8.12.1/img/champion/' + name + '.png';
                    }
                })
                //Champ 2
                request({
                    url: 'https://BR1.api.riotgames.com/lol/static-data/v3/champions/' + champIDs[2] + api,
                    json: true
                }, function (error, response, body) {
                    console.log(response)   //429 - Rate limit exceeded
                    //200 - Okay
                    if (!error && response.statusCode === 200) {
                        var toParse = body;
                        var name = toParse['name'];
                        console.log('Nombre:' + name)

                        var canvas = document.getElementById('myCanvas');
                        var context = canvas.getContext('2d');


                        //Rectangle
                        context.save();
                        context.fillStyle = "#ffffff";
                        context.strokeStyle = "rgba(1, 1, 1, 0)";
                        context.beginPath();
                        context.moveTo(360,20);
                        context.lineTo(420,20);
                        context.quadraticCurveTo(440,20,440,40);
                        context.lineTo(440,30);
                        context.quadraticCurveTo(440,50,420,50);
                        context.lineTo(360,50);
                        context.quadraticCurveTo(340,50,340,30);
                        context.lineTo(340,40);
                        context.quadraticCurveTo(340,20,360,20);
                        context.closePath();
                        context.fill();
                        context.stroke();
                        context.restore();

                        

                        //image
                        var img = new Image();
                        img.height = 32;
                        img.onload = function () {
                            context.save();
                            context.beginPath();
                            context.arc(335, 35, 25, 0, 2 * Math.PI);
                            context.clip();
                            context.drawImage(img, 300, 0, 64, 64);
                            context.closePath();
                            context.restore();
                        }
                        img.src = 'https://ddragon.leagueoflegends.com/cdn/8.12.1/img/champion/' + name + '.png';


                        //Text
                        var canvas2 = document.getElementById('myCanvas2');
                        var context2 = canvas2.getContext('2d');
                        context2.save();
                        context2.globalCompositeOperation="source-over";
                        context2.font = "11px Verdana";
                        context2.strokeText('M' + champLVLs[0] + "- " + parseFloat(champPoints[0] / 1000).toFixed(2) + "k" + '                    M' + champLVLs[1] + "- " + parseFloat(champPoints[2] / 1000).toFixed(2) + "k" + '                      M' + champLVLs[1] + "- " + parseFloat(champPoints[2] / 1000).toFixed(2) + "k", 64, 39);
                        console.log('M' + champLVLs[2] + "- " + parseFloat(champPoints[2] / 1000).toFixed(2) + "k");
                        context2.restore();
                    }
                })


            }
        })



    }
})
//End of name, image and lvl request




