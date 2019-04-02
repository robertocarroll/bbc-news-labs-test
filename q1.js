
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
  percentPageviews = "The total percentage of pageviews from mobile and tablet is " + percentPageviews.toFixed(2) + "%";

   fs.writeFile("./output/q1-percent-pageviews.txt", percentPageviews, function(err) {
      console.log("Q1 file written");
    });

});


