var util = require('mis-util');
var config = require('./config.ignore.json');

var mis = util({
   sysname: '/c1/FRSH',
   connect: {
      host: 'gccmhc',
      user: 'tim',
      password: config.user
   },
   cron: {
      user: 'datamgr',
      pass: config.cron
   }
});

var uscpath = mis.settings.sysname + mis.settings.usc_path.remote;
mis.deploy.file("./msa-close-invalid.usc", uscpath)
.then(function(file) {
   return mis.script.compile([file]);
})
.then(function() {
   //return mis.script.run([{name: "msa-close-invalid", args: []}]);
});

mis.deploy.file('./msa-open-valid.usc', uscpath)
.then(function(file) {
   return mis.script.compile([file]);
})
.then(function() {
   return mis.script.run([{name: "msa-open-valid", args:[]}]);
});
