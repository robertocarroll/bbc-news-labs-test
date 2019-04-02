
var fs = require("fs");
var d3 = require("d3");

fs.readFile('./data/article-Devices.csv', 'utf8', function (err, data) {
  var allData = d3.csvParse(data);

  var meanMobileAverage = d3.mean(allData,function(d) { return +d.Mobile})

  var bestMobileTimes =
    allData
      .filter(function (e) {return e.Mobile > meanMobileAverage;})
      .map (function(d){ return {
          date: d.Date,
          pageviews: d.Mobile
        }
    });

  console.log ("Mean mobile average is: " + meanMobileAverage);

    bestMobileTimesString = d3.csvFormat(bestMobileTimes);

    fs.writeFile("./output/good-mobile-times.csv", bestMobileTimesString, function(err) {
      console.log("Q2 file written");
    });
});


