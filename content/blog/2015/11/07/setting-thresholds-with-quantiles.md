---
author: Baron Schwartz
categories:
- Math
- Monitoring
date: 2015-11-07T19:39:36-05:00
description: "A simple visualization reveals lots of details about the shape of
data."
image: "/media/2015/11/quantiles.png"
title: Setting Thresholds With Quantiles
---

I was talking with someone the other day about a visualization that could help
figure out a reasonable value for a threshold on a metric. As I've
[written](https://www.vividcortex.com/blog/2013/04/10/2-reasons-why-threshold-based-monitoring-is-hopelessly-broken/),
thresholds are basically a broken way to monitor systems, but if you're going to
use them, I think there's a lot you can do to avoid making threshold values
*completely* arbitrary.

I couldn't find the place I'd seen the visualization (if you do, please
comment!) so I decided to just blog about it. Suppose you start off with a time
series:

![time series](/media/2015/11/time-series.png)

<!--more-->

The idea is that you might want to alert on this metric breaking some threshold,
but what's the right value? There are lots of ways you could do it: a multiple
of the average, some quantile, some number of standard deviations from the mean,
etc, etc. For example, you could say "I want to alert if the metric exceeds its
usual 99.9th percentile." But isn't 99.9 an arbitrary number, too? What makes it
so special? Is there *any* way to pick a number that isn't just pulled out of a
hat?

I need to preface all of this with a disclaimer. Everyone's systems are
different, static thresholds are silly, quantiles are known to the state of
California to cause cancer, and so on. What I'm about to show you is only
*slightly* less arbitrary. Don't confuse it for a rule that actually has a
strong reason why it's better than the alternatives.

The idea is to look at the *shape* of your data and use that to decide where you
feel is the right threshold. The "shape" is the distribution of the data--how
its values are typically spread.

One of the best ways to do that is to plot the quantiles. In the following plot,
the quantiles go from left to right. At the far left is the 0th percentile, and
at the far right is the 100th percentile. Another way to say that is the left is
the minimum value and the right is the maximum value.

![quantiles](/media/2015/11/quantiles.png)

I've made no effort to polish this chart; you'll notice that I generated the
quantiles by taking a vector of 1000 numbers and dividing it by 1000, for
example.

Now, as you look at this chart, you can see that near the far right, it suddenly
jumps--it has an elbow. Let's zoom in on the last 10% of the chart, i.e. the 90th
percentile and above:

![95th percentile](/media/2015/11/95-percent.png)

There's nothing magical about this elbow. There's nothing magical about the last
10 percent of values. It just so happens that those last few are
disproportionately larger than the rest. In simple terms, it means that the
system's model, or perhaps the parameters for its model, apparently changed.
And if you're going to pick a place to alert on a threshold, maybe a point where
the behavior diverges rapidly is as good as any and better than some.

In other words, you could put your threshold just at the point where the
quantile plot gets steeper, which is about the value 1600 in this dataset.

Not all data behaves this way. Some metrics will have a nice line all the way up
and to the right, with no elbow. Some will jump sooner. Some will have a big
ledge, even several ledges. You'll get all kinds of different shapes and sizes
of data. The point is to at least *know* what shapes and sizes your own data
has.

Visualizations like this have a lot of explanatory power and can show you
potentially surprising things very easily. That's why this kind of
visualization, rather than just the standard boring time series plot, is not a
bad thing to know how to do. It's not revolutionary, things like this are used
in all sorts of ways and by lots of people. [QQ
plots](https://en.wikipedia.org/wiki/Q%E2%80%93Q_plot), for example, are a
related technique.

So I'm probably repeating myself too much, but again this is nothing special,
but it's something anyway. With this approach, there still may not be a strong
justification for choosing a number as a threshold, but at least there's a
reason and method, and it's better than cargo cult, a random number generator,
or copy-and-paste.

Here's the R code.

    perf <- read.csv("/path/to/perf.csv", sep="")
    plot(perf$tput)
    plot(c(1:1000), quantile(perf$tput, probs=c(1:1000)/1000))
    plot(c(900:1000), quantile(perf$tput, probs=c(900:1000)/1000))

Related: someone on Twitter pointed me to [this blog post from Dynatrace](http://apmblog.dynatrace.com/2012/11/14/why-averages-suck-and-percentiles-are-great/).
