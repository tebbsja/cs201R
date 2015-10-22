var ACCchamps = [
  {
    year: '2000',
    football: 'Florida State',
    basketball: 'Duke'
  },
  {
    year: '2001',
    football: 'Maryland',
    basketball: 'Duke'
  },
  {
    year: '2002',
    football: 'Florida State',
    basketball: 'Duke'
  },
  {
    year: '2003',
    football: 'Florida State',
    basketball: 'Duke'
  },
  {
    year: '2004',
    football: 'Virginia Tech',
    basketball: 'Maryland'
  },
  {
    year: '2005',
    football: 'Florida State',
    basketball: 'Duke'
  },
  {
    year: '2006',
    football: 'Wake Forest',
    basketball: 'Duke'
  },
  {
    year: '2007',
    football: 'Virginia Tech',
    basketball: 'North Carolina'
  },
  {
    year: '2008',
    football: 'Virginia Tech',
    basketball: 'North Carolina'
  },
  {
    year: '2009',
    football: 'Georgia Tech',
    basketball: 'Duke'
  },
  {
    year: '2010',
    football: 'Virginia Tech',
    basketball: 'Duke'
  },
  {
    year: '2011',
    football: 'Clemson',
    basketball: 'Duke'
  },
  {
    year: '2012',
    football: 'Florida State',
    basketball: 'Florida State'
  },
  {
    year: '2013',
    football: 'Florida State',
    basketball: 'Miami'
  },
  {
    year: '2014',
    football: 'Florida State',
    basketball: 'Virginia'
  },
  {
    year: '2015',
    football: 'To Be Determined',
    basketball: 'Notre Dame'
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
