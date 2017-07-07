var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var request = require('request')
var morgan = require('morgan')
var sprintf = require('sprintf-js').sprintf
var config = require('./config')

var port = process.env.PORT || 8080
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname,'/public/index.html'))
});

//Simule une réponse de cobra
app.post('/api/verifyCode', function(req, res){
  var returnValue = req.body.CobraCode == "12345678" && req.body.SSN == "12345678";
  res.json({ codeIsValid: returnValue }).status(200); 
})

//Appel azure création user
app.post('/api/createuser', function(req, res){
  var getTokenOptions = getRequestTokenOptions();
  var data = req.body.data;

  if(!data)
  {
    data = {
      email: "thierrythierry@test2.com",
      SSN: "11111111",
      firstName: "ThierryThierry",
      lastName: "BigotBigot",
      password: "test1234"
    }
  }
  
  request(getTokenOptions, function (error, response, body) {
    if (error) throw new Error(error);

    var accessToken = body.access_token;
    var createOptions = getCreateUserOptions(accessToken, data);

    //Create user  
    request(createOptions, function(error, response, body){
      if (error) throw new Error(error);
      
      if(response.statusCode == 201) {
        res.json({
          accountCreated: (response.statusCode == 201)
        }).status(200);
      }
      else {
        res.json({
          accountCreated: false, 
          errorMessage: body['odata.error'].message.value
        }).status(200);
      }
      // var updateOptions = getUpdateUserOptions(accessToken, data, body.userPrincipalName);      
      // //update user SSN
      // request(updateOptions, function(error, response, body){
      //   if (error) throw new Error(error);
      //   res.status(200).send(body);
      // })
    })
  });
  //res.json({accountCreated: true}).status(200);
})

//Appel azure sign in user
app.post('/api/signin', function(req, res){
  var data = req.body.data;

  var userData = {
    userName:data.email,
    password:data.password
  }
  var options = getRequestTokenForUserOptions(userData);
  request(options, function(error, response, body){
    if (error) throw new Error(error);
    console.log(body);
    res.json({test:true}).status(200);
  });
      
})

function getRequestTokenOptions(userData){
    //console.log(req.body.data);
  var getTokenURL = sprintf(
    'https://login.microsoftonline.com/%s.onmicrosoft.com/oauth2/token', 
    config.Tenant
  )
  var options = { method: 'POST',
    url: getTokenURL,
    headers: 
    { 
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    json: true,
    form: 
    { 
      grant_type: 'client_credentials',
      client_id: config.ApplicationID,
      'client_secret\n': config.ApplicationSecret
    } 
  };
  return options;
}

function getRequestTokenForUserOptions(userData){
    //console.log(req.body.data);
  var getTokenURL = sprintf(
    'https://login.microsoftonline.com/%s.onmicrosoft.com/oauth2/token', 
    config.Tenant
  )
  var options = { method: 'POST',
    url: getTokenURL,
    headers: 
    { 
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    json: true,
    form: 
    { 
      grant_type: 'password',
      scope:'openid',
      resource:"https://cobrab2c.azurewebsites.net",
      client_id: config.ApplicationID,
      'client_secret\n': config.ApplicationSecret,
      username: userData.userName,
      password: userData.password
    } 
  };
  return options;
}

function getCreateUserOptions(bearerToken, data){
  var graphAPI_URL = sprintf('https://graph.windows.net/%s.onmicrosoft.com/users?api-version=1.6', config.Tenant)
  var options = { method: 'POST',
    url: graphAPI_URL,
    headers: 
    { 
      'Authorization': bearerToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      "accountEnabled": true,
      "creationType": "LocalAccount",
      "displayName": sprintf('%s %s', [data.firstName, data.lastName]),
      "givenName": data.firstName,
      "surname": data.lastName,
      "passwordProfile": {
        "password": data.password,
        "forceChangePasswordNextLogin": false
      },
      "signInNames": [
        {
          "type": "emailAddress",
          "value": data.email
        }
        // ,
        // {
        //   "type": "userName",
        //   "value": data.firstName + data.lastName
        // }
      ]
    },
    json: true
  };
  return options;
}

function getUpdateUserOptions(bearerToken, data, userid)
{
  var graphAPI_URL = sprintf(
    'https://graph.windows.net/%s.onmicrosoft.com/users/%s?api-version=1.6', 
    config.Tenant, userid
  )
  var options = { method: 'PATCH',
    url: graphAPI_URL,
    headers: 
    { 
      'Authorization': bearerToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      "SocialSecurityNumber": data.SSN
    },
    json: true
  };
  return options;  
}

app.listen(port);