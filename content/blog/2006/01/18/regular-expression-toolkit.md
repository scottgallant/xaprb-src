---
title: JavaScript regular expression toolkit
date: "2006-01-18"
url: /blog/2006/01/18/regular-expression-toolkit/
categories:
  - Web
---
I have created a web page that matches regular expressions against arbitrary input text and displays the results graphically, so you can take some sample text and build regular expressions the easy way, with immediate feedback about what matches and where, where you have errors, and more.

<img src="/media/2006/01/rx-toolkit.png" alt="Regular Expression Toolkit Screenshot" width="449" height="225" />

I've been working on this for a couple of weeks, a minute here and there as I get time. A few days ago I saw someone created a very nifty similar app over at [Rex V](http://www.rexv.org/). Apparently the pundits are right -- never assume you're the only one with an idea.

Mine is simpler and doesn't use AJAX. It's JavaScript only. Thanks to the folks at [ActiveState](http://www.activestate.com/) for the idea -- I was inspired by [Komodo](http://www.activestate.com/Products/Komodo/). I have to wonder whether Rex V was too!

Here it is: the [JavaScript regular expression toolkit](/rx-toolkit/).

I used my work on [grouping data visually with row groups](/blog/2006/01/10/grouping-data-visually-with-row-groups/) and [browser variations in `RexExp.exec()`](/blog/2006/01/14/browser-variations-in-regexpexec/) to build this tool.


