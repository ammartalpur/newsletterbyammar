const express = require('express');
const bodyParser = require('body-parser');
const client = require("@mailchimp/mailchimp_marketing");
const request = require('request');

// Api-Key: 9d73efdd54549433cfb24b48d11338d9-us14
// id: 9222de2096
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (_, res) {
    res.sendFile(__dirname + '/src/signup.html')
})
app.post('/signup', function (req, res) {
    const { email, fName, lName } = req.body;

    client.setConfig({
        apiKey: "9d73efdd54549433cfb24b48d11338d9-us14",
        server: "us14",
    });

    const run = async () => {
        const response = await client.lists.batchListMembers("9222de2096", {
            members: [{
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }],
        });
        if(response.error_count === 0 ){
                res.sendFile(__dirname + '/src/success.html')
        }else{
                res.sendFile(__dirname + '/src/failure.html')
                console.log(response);
            }
    };

    run();


})
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
})



