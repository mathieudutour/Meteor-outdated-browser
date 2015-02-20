A time saving tool for developers. It detects outdated browsers and advises users to upgrade to a new version.
Meteor version of [Outdated Browser v1.1.0](https://github.com/burocratik/outdated-browser).

Installation
============

    $ meteor add matdutour:oudated-browser

Usage
=====

    UI.body.rendered = function () {
      new OutdatedBrowser({
        message: "Update your browser to view this website correctly.",
        title: "Your browser is out-of-date!",
        button: "Update my browser now ",
        bgColor: "#F25648",
        color: "#FFF",
        lowerThan: "transform"
      });
    }
    
Targeting browsers:

  You can do it in one of two ways: using Internet Explorer browsers as reference or specifying a CSS property. The outcome is the same, choose what is easier for you.

  Lower Than (<):
  * "IE11","borderImage"
  * "IE10", "transform" (Default property)
  * "IE9", "boxShadow"
  * "IE8", "borderSpacing"
	
