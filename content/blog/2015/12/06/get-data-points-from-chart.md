---
author: Baron Schwartz
categories:
- Math and Statistics
date: 2015-12-06T19:38:48-05:00
description: ""
image: ""
title: How to Extract Data Points From a Chart
---

I often see benchmark reports that show charts but don't provide tables of
numeric results. Some people will make the actual measurements available if
asked, but I've been interested in
[analyzing](https://www.vividcortex.com/resources/universal-scalability-law/)
many systems for which I can't get numbers.  Fortunately, it's usually possible
to get approximate results without too much trouble. In this blog post I'll show
several ways to extract estimates of values from a chart image.

![Extracting](/media/2015/12/espresso.jpg)

<!--more-->

I'll motivate the idea with a simple chart of a slide I saw at the recent
PGConfSV conference on a keynote presentation. I was interested in the benchmark
data (for [CitusDB](https://www.citusdata.com/), in this case) but I am sure
they are busy and I haven't gotten in touch with them yet about it. So I watched
the YouTube video of the keynote address, paused it when the slide was showing,
and took a screenshot.

![CitusDB Benchmark Result](/media/2015/12/citusdb-benchmark.jpg)

I'd like to use the Universal Scalability Law to analyze the chart on the left
and estimate how much of CitusDB's massively parallel processing is serialized.
I am not an expert on it, but I believe it uses a PostgreSQL node with a plugin
as a query planner and router, sends queries to shards containing data, and
combines the results to return them to the client. This is fairly standard
scatter-gather processing. One of the big limiting factors for such a system is
typically the query planning and the merging of the results. How much of the
overall execution time does that take? The Universal Scalability Law can help
understand that. But to analyze the system, first I need its data.

Let's see how to get it.

### Doing It The Hard Way

I'm going to show you two hard ways to do this and suggest a couple of easier
ways.

One is to use any photo editing software and a ruler or crop function to
estimate the pixel center of the points on the chart. For example, here's a
screen capture of dragging from the bottom left of the image to the bottom left
of the chart to get an X-Y point for the intersection of the chart's X and Y
axes. I'm using the default Mac image editing program here, Preview:

![Using Preview To Estimate Points](/media/2015/12/using-preview.jpg)

The result is X=326,Y=183. Do this repeatedly for all the points on the chart
and then put the results into a spreadsheet, subtract the origin X and Y from
all the points, and normalize them relative to known points on the chart axes
(which you should also measure) and you've got your results. Here's a screenshot
of the spreadsheet I made to do this. The points I measured are in green and the
results are in purple:

![Spreadsheet to calculate results](/media/2015/12/points-spreadsheet.png)

You may [download the spreadsheet](/media/2015/12/spreadsheet.xlsx) if you'd
like to look at it. 
It's quite clear from the chart's context that the X-values should actually be
1, 5, 10 and 20 so those are easy corrections to make.
Using this technique I estimate the points as follows:

     1   36250
     5  110000
    10  195000
    20  313750

A similar technique is to use [Desmos](https://www.desmos.com). You can insert
an image, set its dimensions equal to its pixel count, then create a table and
use the gear menu to enable dragging on the table's points, turning on the 4-way
drag handles. Then align points over the chart's points, and you can read off
the values from the table just as with the Preview app:

![Using Desmos](/media/2015/12/using-desmos.jpg)

One nice thing about this method is that you can then combine the image with any
graphs you're making. For example, I used this method to facetiously analyze the
[path of the eclipsing
moon](http://www.vividcortex.com/blog/2015/11/28/a-trendline-is-a-model/) on a
recent blog post.

### Easier Ways

Why use hard methods like that? I believe the hard ways are still valuable to
know about. First of all, when you do it you get a firm grasp on the math and
you're tuned in to what you're working on (or I am, at least). Second, sometimes
when charts are skewed by, say, the camera's perspective, you have to estimate
where the points would fall if the skew were corrected.

That said, there are a few tools that are easier to use and produce good
results. While searching online I found
[engauge](http://digitizer.sourceforge.net/), [Data
Thief](http://www.datathief.org/), and [http://di8itapp.com/](di8itapp). But the
best one I've found so far is the free online [web plot
digitizer](http://arohatgi.info/WebPlotDigitizer/app/), which runs in the
browser and produced quite good results for me. It allows very fine control over
the placement of the points. The extracted points are:

     0.995104673   32858.00211
     5.070422535  108307.8542
    10.07535128   196097.94
    20.17810302   312738.7098

Of course, the X-points should be set to 1, 5, 10, and 20 as before.

As a bonus, this app integrates with [Plotly](https://plot.ly), and can
automatically send the resulting data points there for analysis. Plotly is a
tool I wasn't aware of previously. I found it quite nice for this type of
analysis and was able to quickly run a regression against the USL and estimate
the coefficient of serialization at 4% and the coefficient of crosstalk at 0,
which is very realistic for this type of system in my experience:

![Plotly](/media/2015/12/plotly.jpg)

That was easy! Easier than using RStudio, perhaps.

### Conclusions

Using the techniques I showed in this article you can extract graph points from
a variety of different images when you lack the source data. Some of these
techniques are easier to use on large datasets than others, and some are just
more fun if you feel like doing things manually, but all can produce results
good enough for many purposes.

If you're curious about the analysis of CitusDB, and what it means for it to
have a coefficient of serialization (sigma) of about 4%, please read my
[introduction to the Universal Scalability
Law](https://www.vividcortex.com/resources/universal-scalability-law/). If
you're like me, you'll find it fascinating that such a model exists. (Exercise
for the reader: what's the maximum speedup CitusDB should be able to achieve as
you add more nodes to it?)

[Photo by Scott Schiller on Flickr](https://www.flickr.com/photos/schill/14418736104/).
