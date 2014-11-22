// light low med high
// off red orange yellow green sky blue purple white

// Requirements
var argv = require('minimist')(process.argv.slice(2));
var keyboard = require('msi-keyboard');
var fs = require('fs');

// Vars
var debugVar = (argv.d?true:false);
var defaultColor = "white";
var defaultSection = "all";
var defaultIntensity = "high";
var locked = false;
var tmpFileName = "/tmp/_keyboard.backlight.lock";

var lightOff = "off";
var colors = ["red","orange","yellow","green","sky","blue","purple","white"];
var sections = ["left","middle","right"];
var intensities = ["high","med","low","light"];
var themes = {
  "cool" : {
    "left" : { "color" : "green"},
    "middle" : { "color" : "yellow"},
    "right" : { "color" : "yellow"},
  },
  "france" : {
    "left" : { "color" : "blue"},
    "middle" : { "color" : "white"},
    "right" : { "color" : "red"},
  },
  "italy" : {
    "left" : { "color" : "green"},
    "middle" : { "color" : "white"},
    "right" : { "color" : "red"},
  },
  "ireland" : {
    "left" : { "color" : "green"},
    "middle" : { "color" : "white"},
    "right" : { "color" : "orange"},
  },
  "rasta" : {
    "left" : { "color" : "green"},
    "middle" : { "color" : "yellow"},
    "right" : { "color" : "red"},
  },
};
var mods = ["normal","gaming","breathe","demo","wave"];

// Functions
function printHelp() {
  var h = "\n     (msi-keyboard-CLI) Munsch Jeremy <jeremy.munsch@gmail.com>\n";
  h += "\tnodejs backlight.js section color intensity(optional) blink(optional)\n";
  h += "\t-d\t\tprint debug\n";
  h += "\t-k (on|off)\tKeyboard backlight\n";
  h += "\t-l (on|off)\tKeyboard locker, command with -i won't work if -l is on\n";
  h += "\t\t\tuse it to override a cron task by example command without -l)\n";
  h += "\t-c  color\tall colors\n";
  h += "\t\t\tcolors ("+colors.join(',')+")\n";
  h += "\t-b  blink\tblink Xms ex : -b 750\n";
  h += "\t-i  intensity\tall colors\n";
  h += "\t\t\tintensity ("+intensities.join(',')+")\n";
  h += "\t\t\tsection ("+sections.join(',')+")\n\t\t\tex : left red low\n";
  h += "\t-t  theme\tthemes are : "+Object.keys(themes).join(',')+"\n";
  h += "\t-m  mod\t\tmods are : "+mods.join(',')+"\n";
  h += "\t-h or --help prints this help message\n\n";
  h += "\tdefault color : "+defaultColor+"\n";
  h += "\tdefault intensity : "+defaultIntensity+"\n";
  h += "\tdefault section : "+defaultSection+"\n";
  h += "\n\tuses\tminimist\thttps://www.npmjs.org/package/minimist\n";
  h += "\t\tmsi-keyboard\thttps://github.com/wearefractal/msi-keyboard\n";
 
  console.log(h);
  process.exit(1); // Exit program
}

function echo() {
  var largs = Array.prototype.slice.call(arguments, 0);
  for(var arg in largs) {
    largs[arg] = JSON.stringify(largs[arg]);
  }
  console.log(largs.join(' ').replace(/["'\[\]\{\}]/g,'')+'.');
}

function debug() {
  var largs = Array.prototype.slice.call(arguments, 0);
  for(var arg in largs) {
    largs[arg] = JSON.stringify(largs[arg]);
  }
  if(debugVar) console.log(largs.join(' ').replace(/["'\[\]\{\}]/g,'')+'.');
}

// Help Section
if(argv.h || argv.help) {
  printHelp();
}

// Mod Section
if(argv.m) {
  if(mods.indexOf(argv.m) !== -1) {
    keyboard.mode(argv.m);
    process.exit(0);
  } else {
    echo("You have to choose a mod between :",mods);
    process.exit(128); // Exit program
  }
}

// Color Section
if(argv.c) {
  if(colors.indexOf(argv.c) !== -1) { // Choosen colors exists
    defaultColor = colors[colors.indexOf(argv.c)];
    debug('Color is set to '+defaultColor);
  } else {
    echo("You have to choose a color between :",colors);
    process.exit(128); // Exit program
  }
}

// Intensity Section
if(argv.i) {
  switch(argv.i) {
    case "high":
    case "med":
    case "low":
      debug('Intensity: '+argv.i);
      defaultIntensity = argv.i;
      break;
    default:
     echo("option -i accepts high,med,low, (ex: -i low) \ntype --help or -h to have some more help");
     process.exit(128); // Exit program
  }
}

// Blink Section
if(argv.b) {
  if(typeof argv.b === "number") {
    keyboard.blink(parseInt(argv.b));
  } else {
    echo("option -b accepts integer, (ex: -b 250 for blink = 250ms) \ntype --help or -h to have some more help");
     process.exit(128); // Exit program
  }
}

var keyboardArgs = {
  "left" : { "color" : defaultColor, "intensity" : defaultIntensity},
  "middle" : { "color" : defaultColor, "intensity" : defaultIntensity},
  "right" : { "color" : defaultColor, "intensity" : defaultIntensity},
};

// Lock Section
if(argv.l) {
  switch(argv.l) {
    case "on":
      debug('Lock: on');
      var fs = require('fs');
      fs.writeFile(tmpFileName, "locked", function(err) {
	if(err) {
	  debug(err);
	} else {
	  debug("Lock is successfull");
	}
      }); 
      break;
    case "off":
      debug('Lock: off');
      fs.unlink(tmpFileName, function(err) {
	if(err) {
	  debug(err);
	} else {
	  debug("Unlock is successfull");
	}
      }); 
      break;
    default:
     echo("option -l accepts on or off, (ex: -l on) \ntype --help or -h to have some more help");
     process.exit(128); // Exit program
  }
}

// Backlight Section
if(argv.k) {
  switch(argv.k) {
    case "on":
      debug('Backlight: on');
      for(var section in keyboardArgs) {
	keyboardArgs[section].color = defaultColor;
	keyboardArgs[section].intensity = defaultIntensity;
      };
      break;
    case "off":
      debug('Backlight: off');
      for(var section in keyboardArgs) {
	keyboardArgs[section].color = lightOff;
	keyboardArgs[section].intensity = defaultIntensity;
      }
      break;
    default:
      echo("option -k accepts on or off, (ex: -k on) \ntype --help or -h to have some more help");
      process.exit(128); // Exit program
  }
}

// Parse section parameters
for(var key in argv._) {
  var section = argv._[key];
  debug("key : "+key+"  value : "+section);
  if(sections.indexOf(section) !== -1) { // is section
    debug("Section given is "+section);
    var color = argv._[parseInt(key)+1];
    if(colors.indexOf(color) !== -1) { // is next a color
      debug("Color of  "+section+" is "+color);
      var intensity = argv._[parseInt(key)+2];
      intensity = intensity?intensity:defaultIntensity;
      if(intensities.indexOf(intensity) === -1) { // Is next not an intensity
	echo(section+" "+color+" must be followed by an intensity, given is "+intensity+" \ntype --help or -h to have some more help");
	process.exit(128); // Exit program
      }
      var blink = parseInt(argv._[parseInt(key)+3]);
      if(!isNaN(blink)) {
	keyboard.blink([section],blink);
      } else {
	echo("blink must be a number, given is "+argv._[parseInt(key)+3]);
	process.exit(128); // Exit program
      }
      debug("Section "+section+" is set to "+color+" at "+intensity+" level and blinks at "+blink+" ms");
      keyboardArgs[section].color = color;
      keyboardArgs[section].intensity = intensity;
    } else {
      echo(section+" must be followed by a color, given is "+color+"; and optionnaly an intensity \ntype --help or -h to have some more help");
      process.exit(128); // Exit program
    }
  }
}

// Check theme
if(argv.t) {
  if(typeof themes[argv.t] !== "undefined") { // is theme
    keyboardArgs = themes[argv.t];
  } else {
    echo("option -t must be a theme \ntype --help or -h to have some more help");
    process.exit(128); // Exit program
  }
}
    

// Check is locked
fs.exists(tmpFileName, function(exists) {
  locked = exists?true:false;
  debug("Locked status is "+locked);
  if(!locked || argv.l) {
    for(var section in keyboardArgs) {
      debug(section,keyboardArgs[section]);
      keyboard.color(section, {color: keyboardArgs[section].color, intensity: keyboardArgs[section].intensity});
    };
    process.exit(0);// Exit program
  } else {
    debug("Don't touch anything cause keyboard backlight lock");
     process.exit(-1); // Exit program
  }
});

// End of program
