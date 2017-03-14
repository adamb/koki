

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
var cheerio = require('cheerio');
var request = require('request');


// Your Google Cloud Platform project ID
const projectId = 'gcf-streaming';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// The kind for the new entity
const kind = 'Task';
// The name/ID for the new entity
const name = 'sampletask1';
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, name]);

// Prepares the new entity
const task = {
  key: taskKey,
  data: {
    description: 'Buy milk'
  }
};

// Saves the entity
datastore.save(task)
  .then(() => {
    console.log(`Saved ${task.key.name}: ${task.data.description}`);
  });


function handleGET (req, res) {
  // Do something with the GET request
	url = 'http://www.weatherlink.com/user/cokikite/index.php?view=main&headers=0'
    request(url, function(error, response, html){
		
		if(!error){ 
            // uncomment next line and it kills Functions emulator 
			var $ = cheerio.load(html);
			
			var speed, direction;
			var json = { speed : "", direction : ""};
			
		    $('.header').filter(function(){

		             // Let's store the data we filter into a variable so we can easily see what's going on.

		                  var data = $(this);

		             // In examining the DOM we notice that the title rests within the first child element of the header tag. 
		             // Utilizing jQuery we can easily navigate and get the text by writing the following code:

		                  title = data.children().first().text();

		             // Once we have our title, we'll store it to the our json object.

		                  json.title = title;
						  
		       })
		}
	})
	
  res.status(200).send('Hello Koki dah!');
}
	
function foo() {
  // res.status(200).send('Hello Koki!');
  url = 'http://www.weatherlink.com/user/cokikite/index.php?view=main&headers=0'
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
			
		    $('.header').filter(function(){

		             // Let's store the data we filter into a variable so we can easily see what's going on.

		                  var data = $(this);

		             // In examining the DOM we notice that the title rests within the first child element of the header tag. 
		             // Utilizing jQuery we can easily navigate and get the text by writing the following code:

		                  title = data.children().first().text();

		             // Once we have our title, we'll store it to the our json object.

		                  json.title = title;
						  res.status(200).send('Hello Koki!');
						  
		              })
        }
    })
}

function handlePUT (req, res) {
  // Do something with the PUT request
  res.status(403).send('Forbidden!');
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.kokiHttp = function helloHttp (req, res) {
  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'PUT':
      handlePUT(req, res);
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};