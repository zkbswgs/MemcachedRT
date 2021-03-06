// Options for the Google Chart
var options = {};
// Data to pass yo Google Charts
var data    = [];

// Load the Google Chart library and callback when it's ready
google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(function() {
	// Google Charts has loaded, let's set some global variables.
	// .. We do this here and not in the drawChart function so it
	// .. isn't executed every time!

	// Options for the Google Chart
	options = {
		backgroundColor:    { fill: "#E67373" },
		colors:             [ "#DDD", "#D61414" ],
		areaOpacity:        0.2,
		legend:             { position: "none" },
		chartArea:          { left: 0, top: 0, width: "98%", height: "100%" },
		lineWidth:          1,
		fontSize:           10,
		vAxis: {
			minValue:       0,
			maxValue:       graphMaxActionsPerSecond,
			textStyle:      { color: "#F6CBCB" },
			textPosition:   "in",
			gridlines:      { color: "#F0AEAE", count: 6 },
			minorGridlines: { color: "#EA8989", count: 1 },
			baselineColor:  "#F0AEAE",
		},
	};

	// Allow the graph to animate?
	if (graphEnableAnimations) {
		options['animation'] = { duration: 1000, easing: "inAndOut" };
	}

	// This is the reference to the DOM element
	chart = new google.visualization.AreaChart(
		document.getElementById("memcached-graph-live")
	);
});

// Draw the Google Chart
// This is called from within the pusher.js file
function drawChart() {
	chart.draw(
		google.visualization.arrayToDataTable(data),
		options
	);
}

// Data holds all of the points that we need to log
// @todo Get this from MySQL sometime in the fure.
for (i = 0; i <= window.graphSecondsToDisplay; i++) {
	data.push([ "void", 1, 20 ]);
}

// Update our data array with the new data received from the push event
function getData(psActions, psEvictions) {
	// Take the oldest point off..
	data = data.slice(1);

	// .. and add in the new data
	data.push([
		new Date().toUTCString(),
		parseInt(psActions),
		parseInt(psEvictions)
	]);
}