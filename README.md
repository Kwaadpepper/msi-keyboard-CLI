<h1>msi-keyboard-CLI</h1>

<h2>Note the program has to be used with a sudoer account</h2>
<stong>You have to install ```libusb-dev``` on linux system</stong>

**It uses https://github.com/wearefractal/msi-keyboard as a npm dependency, so no need to install it separatly, just follow the installaton instruction**
##### You can now use this as a bash script:
```msibacklight -h```
(will not work with cron, keep using the explained way above for this)
 
================
```
Just a nodejs cli to control https://github.com/wearefractal/msi-keyboard.
    (msi-keyboard-CLI) Munsch Jeremy <jeremy.munsch@gmail.com>
      nodejs backlight.js section color intensity(optional) blink(optional)
	     -d		print debug
	     -k (on|off)	Keyboard backlight
	      -l (on|off)	Keyboard locker, command with -i won't work if -l is on
	    		use it to override a cron task by example command without -l)
	    -c  color	all colors
		    	colors (red,orange,yellow,green,sky,blue,purple,white)
    	-b  blink	blink Xms ex : -b 750
    	-i  intensity	all colors
	    		intensity (high,med,low,light)
	    		section (left,middle,right)
	    		ex : left red low
    	-t  theme	themes are : cool,france,italy,ireland,rasta
    	-m  mod		mods are : normal,gaming,breathe,demo,wave
    	-h or --help prints this help message

    	default color : white
    	default intensity : high
    	default section : all

    	uses	minimist	https://www.npmjs.org/package/minimist
	        	msi-keyboard	https://github.com/wearefractal/msi-keyboard
```
================
Example of use:

```
nodejs msi-keyboard-CLI.js
nodejs msi-keyboard-CLI.js -c green
nodejs msi-keyboard-CLI.js -i low
nodejs msi-keyboard-CLI.js -k off
nodejs msi-keyboard-CLI.js -b 600
nodejs msi-keyboard-CLI.js left orange light 0 -k off right red
nodejs msi-keyboard-CLI.js -k off right blue high 1000 left blue high 1000 
```


<h2>Installation (in short)</h2>

    sudo apt-get install npm nodejs
    sudo ln -s `which nodejs` /usr/bin/node
    git clone https://github.com/Kwaadpepper/msi-keyboard-CLI.git ~/.msi-klm
    cd ~/.msi-klm
    npm install
    msibacklight -k on
    (OR)
    sudo nodejs msi-keyboard-CLI.js -k on
<h2>Installation (explained)</h2>
Intall NodeJS, NPM, Python (sudo apt-get install -y python-software-properties python g++ make),(sudo apt-get install build-essential libssl-dev)
See http://askubuntu.com/questions/545789/gt70-2pe-dominator-pro-or-equal-keyboard-backlight

then type which nodejs, it should give you /usr/bin/nodejs

- Go to your home folder            <strong>"cd ~" or "cd /home/myusername"</strong>
- Create a folder named .msi-klm    <strong>"mkdir .msi-klm && cd .msi-klm"</strong>
- Clone the projet here             <strong>"git clone https://github.com/Kwaadpepper/msi-keyboard-CLI.git ."</strong>
- In ```/home/myusername/.msi-klm```, do a ```npm install```
- Edit cron tab to add 2 commands :
  - one to lightoff keyboard during the day
    <strong>```/usr/bin/nodejs /home/myusername/.msi-klm/msi-keyboard-CLI.js -k off```</strong>
  - one to lightup keyboard at night
    <strong>```/usr/bin/nodejs /home/myusername/.msi-klm/msi-keyboard-CLI.js -t france```</strong>
(You can use http://www.openjs.com/scripts/jslibrary/demos/crontab.php, to generate a cron task)

So i have these lines my /etc/crontab i have the following lines:
```
*       0,1,2,3,4,5,6,7,8,17,18,19,20,21,22,23  *       *       *       root /usr/bin/nodejs /home/kwaadpepper/.msi-klm/msi-keyboard-CLI.js -t france
*       9,10,11,12,13,14,15,16  *       *       *       root /usr/bin/nodejs /home/kwaadpepepr/.msi-klm/msi-keyboard-CLI.js -k off
```

Every minute between between 5pm and 8am my keyboard backlight will light up.

Now il I wan't to override this for example while watchi a movie you can use the arg -l on like
<strong>/usr/bin/nodejs /home/myusername/.msi-klm/msi-keyboard-CLI.js -k off -l on</strong>

This will lightoff the keyboard with -k off and the -l will create a file in /tmp so that every time a command is run without -l, it will be ignored (like the one we putted in /etc/crontab).

<strong>Advanced users</strong>
If you use kde or ubuntu or whatever you can add a hotkey to lightup/lightoff or any custom using kdesudo or gksudo or whatever to execute the command like:
```kdesudo /usr/bin/nodejs /home/myusername/.msi-klm/msi-keyboard-CLI.js -k off -l on```

My ~/.bash_alias:
```
alias keylight='sudo /usr/bin/nodejs /home/kwaadpepper/.msi-klm/msi-keyboard-CLI.js'
alias keylighton='keylight -t cool -l on'
alias keylightoff='keylight -k off -l on'
alias keylightunlock='keylight -k off -l off'
```

If you want you can set any color at blink you wan't like:
```/usr/bin/nodejs /home/myusername/.msi-klm/msi-keyboard-CLI.js left red low 0 middle purple med 2000 right blue high 600```
(not tested)

I Have Kubuntu on my MSI-GT 70 and blink and modes doesn't work on it.

Please feel free to add anything you think cool, and don't forget to support authors of free libraries !

**NOTE**
Working fine with nodejs v0.10.25 and npm 1.4.21
