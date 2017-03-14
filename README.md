# koki

There is a nice [wind meter](http://www.weatherlink.com/user/cokikite/index.php?view=main&headers=1) here in San Juan but it 
doesn't show any history.  I thought it would be fun to create a graph from this meter so I can see the history
of the wind measurements.

I'm going to try a new approach.  First get a simple page running.  Then try to generate a graph. Then firgure out 
how to generatea  graph from datastore.  Then setup a cron job to populate the datastore....


added helloGet.js

> gcloud alpha functions deploy helloGET --stage-bucket koki-staging --trigger-http

Hmm, got this error.  Maybe it needs to be called index.js? 

> ERROR: (gcloud.alpha.functions.deploy) OperationError: code=3, message=Function load error: File index.js or function.js that is expected to define function doesn't exist in the root directory.

Try this:

> gcloud alpha functions deploy gcf-koki --stage-bucket koki-staging --trigger-http

nope

> ERROR: (gcloud.alpha.functions.deploy) OperationError: code=3, message=Function load error: Node.js module defined by file index.js is expected to export function named gcf-koki

Ah, ok, need to call the function gcf-koki or change the deploy parameter.

> gcloud alpha functions deploy helloGET --stage-bucket koki-staging --trigger-http

That worked!  So the file needs to be called index.js and the name of the function needs to match the deploy name.
Now change the function name to kokiGET and deploy.

> gcloud alpha functions deploy kokiGET --stage-bucket koki-staging --trigger-http


Why does the output say gcf-streaming?

> gcloud alpha functions deploy kokiHttp --stage-bucket koki-staging --trigger-http

## Step 1

I need to grab the wind direction and the speed and stick it in a file.  I'm using a cronjob on a server that I know
is always up.  It runs the koki.sh script every minute and sticks the data in a text file.

## Step 2

Deploy a Google Cloud Function that generates and servs a graph.


## Step 3

Write a Google Cloud Function that will trigger each time there is new data in the bucket and create a graph from
that data.

## Questions

I'm doing this because I want to learn GCF and I'm interested in building a widget that is useful to me and other
kite sufers in Puerto Rico.  

I want the graph to show the wind speed for the current day and the previous day.  I want it to be in local time.
In Puerto Rico we don't set our clocks back, so no daylight savings time issues.  

How do I store the old graphs?

What do I use to generate the graphs?  

GCF is node.js, so there must be some graphing packages for node...

Where do I host the actual graph?  Just make a png file and stick it in a Google Cloud Storage bucket?

Eventually I want to put this on my blog, so the graph should be embeddable.  

