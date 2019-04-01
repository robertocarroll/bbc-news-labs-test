
var fs = require("fs");
var d3 = require("d3");

fs.readFile('./data/article-Devices.csv', 'utf8', function (err, data) {
  var allData = d3.csvParse(data);

  var totalPageviews = allData.reduce(function(prevVal, elem) {
      return prevVal + +elem.Total;
    }, 0);

  var mobilePageviews = allData.reduce(function(prevVal, elem) {
      return prevVal + +elem.Mobile;
    }, 0);

  var tabletPageviews = allData.reduce(function(prevVal, elem) {
      return prevVal + +elem.Tablet;
    }, 0);

  var percentPageviews = ((mobilePageviews + tabletPageviews) / totalPageviews)*100;

  console.log ("Total percentage mobile / tablet is: " + percentPageviews.toFixed(2) + "%");

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
  console.log (bestMobileTimes);

    bestMobileTimesString = d3.csvFormat(bestMobileTimes);

    fs.writeFile("./data/good_mobile_times.csv", bestMobileTimesString, function(err) {
      console.log("file written");
    });
});


