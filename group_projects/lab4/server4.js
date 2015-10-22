var ACCchamps = [
  {
    year: '2000',
    winner: 'Florida State'
  },
  {
    year: '2001',
    winner: 'Maryland'
  },
  {
    year: '2002',
    winner: 'Florida State'
  },
  {
    year: '2003',
    winner: 'Florida State'
  },
  {
    year: '2004',
    winner: 'Virginia Tech'
  },
  {
    year: '2005',
    winner: 'Florida State'
  },
  {
    year: '2006',
    winner: 'Wake Forest'
  },
  {
    year: '2007',
    winner: 'Virginia Tech'
  },
  {
    year: '2008',
    winner: 'Virginia Tech'
  },
  {
    year: '2009',
    winner: 'Georgia Tech'
  },
  {
    year: '2010',
    winner: 'Virginia Tech'
  },
  {
    year: '2011',
    winner: 'Clemson'
  },
  {
    year: '2012',
    winner: 'Florida State'
  },
  {
    year: '2013',
    winner: 'Florida State'
  },
  {
    year: '2014',
    winner: 'Florida State'
  }
];


var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
// console.log(JSON.stringify(ACCchamps));
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  //console.log("opening " + ROOT_DIR + urlObj.pathname);
  //console.log("pathname " + urlObj.pathname);

  if (urlObj.pathname == "/acc") {
    console.log("In REST service")
    res.writeHead(200);
    //console.log(JSON.stringify(ACCchamps));
    res.end(JSON.stringify(ACCchamps));
  }
  else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404); //browser recognizes this as error
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200); //brower recognizes this as success
      res.end(data);
    });
  }
}).listen(8080);

console.log("Server Running");
