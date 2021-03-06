## Pricing Lib Demo ##

**Purpose:**

* Given to me as an assignment to demonstrate my coding skills.  

**Technology:**

* JavaScript

**Installation:**

* Copy all the files in this repository to a folder on your web server that you can access with your browser.

**How to Access the Application:**

* Navigate to the URL where you installed the files on your web browser (or optionally you can navigate to a working version of this application 
on my website [here](http://kevinmeixner.com/pricing_lib/) )

**How to Use the Application:**

Options:

1. Use the HTML5 UI provided by index.html to test.
2. Open up the index.html page in the Chrome web browser, open up the development console and then test through the console by typing code similar to the following:

```
var objPricingLib = new PricingLib();
objPricingLib.calculateRate(1299.99, 'food', 3);
```

Where: 

1299.99 := the base price,  
'food' := the sector,  
3 := the number of people

**Unit-testing with JSUnit**

* Navigate to the jsunit/testRunner.html subdirectory with your web browser, eg: [http://kevinmeixner.com/pricing_lib/jsunit/testRunner.html](http://kevinmeixner.com/pricing_lib/jsunit/testRunner.html)
* Type in the URL to the test.html file, eg: [http://kevinmeixner.com/pricing_lib/jsunit/test.html](http://kevinmeixner.com/pricing_lib/jsunit/test.html)
* Click the [Run] button

**Other**

* the 'docs' sub-folder contains experiemental auto-generated documentation from the source code using [JSDoc](http://usejsdoc.org/), eg: [http://kevinmeixner.com/pricing_lib/docs/](http://kevinmeixner.com/pricing_lib/docs/)






