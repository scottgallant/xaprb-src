---
author: Baron Schwartz
categories:
- Databases
date: 2015-11-12T21:00:39-05:00
description: "A formal mathematical analysis of MySQL's scalability yields obvious results."
image: "media/2015/11/chicken.jpg"
title: What Does The Universal Scalability Law Reveal About MySQL?
---

In the last couple of weeks, there have been a few blog posts about benchmarks
comparing the performance of various versions of MySQL and variants such as
MariaDB. There's also been some analysis of the results using formal models such
as Neil Gunther's Universal Scalability Law.

What can the Universal Scalability Law (USL) teach us about the performance
characteristics of these systems, as revealed by the benchmarks? To find out,
I'll examine one particular benchmark, [MariaDB 10.1 and MySQL 5.7 performance
on commodity hardware](https://blog.mariadb.org/maria-10-1-mysql-5-7-commodity-hardware/).

![chicken](/media/2015/11/chicken.jpg)

<!--more-->

The context for this benchmark, in a nutshell, is that MySQL 5.7 was just
released as GA, and the published performance results are spectacular, from the
point of view of throughput on large servers. Although this is good, showing
that MySQL can scale to do lots of work on large servers, the MariaDB
benchmarkers wanted to understand how a simple benchmark would run on a typical
commodity server.

The benchmark compares several versions of MySQL. Neil
[tweeted](https://twitter.com/DrQz/status/658628244413878272) an analysis
of the benchmark with the USL:

![usl-njg-1](/media/2015/11/usl-njg-1.png)

Be careful with that chart, because the horizontal axis is log-scaled, not
linear. What can we learn from that? First of all, if you're familiar with the
USL at all you'll instantly recognize that the system isn't behaving as the USL
predicts. A much better way to model this is to use only the first few
datapoints to predict what might happen if the system didn't encounter the
limitation we can see beginning at 8 connections. Neil [did this
too](https://twitter.com/DrQz/status/658774806578335744):

![usl-njg-2](/media/2015/11/usl-njg-2.png)

Neil's commentary, which I'll paraphrase for clarity, is *If you can remove the
bottleneck at 118k queries per second, the USL predicts that the system will hit
a ceiling around 250k queries per second. Can MySQL or MariaDB get there? If
not, why not? With the USL, it's no longer OK to just measure, you have to
**EXPLAIN** the data.*

The explanation is simple. The server has 4 cores and 8
threads:

> Intel Xeon E5 E5–1630v3	4/8t  <br>
> 3,7 / 3,8 GHz	64  GB RAM<br>
> DDR4 ECC 2133 MHz	2 ×2TB  SOFT

This server can run only 8 queries simultaneously. After that, adding
more connections trying to run queries is not going to improve things.

The USL doesn't include parameters that model the fixed size of underlying
hardware and other resources, and as a result, it's very common to find some
type of resource saturation that creates a ceiling it doesn't predict. This is a
perfect example.

As I discuss in my new [50-page ebook on the
Universal Scalability Law](https://www.vividcortex.com/resources/universal-scalability-law/),
it's rather pointless to try to use the USL to assess behavior beyond a
saturation point such as the one you can see in this benchmark. That's why
fitting the USL to the data up to and including 8 connections is the right
approach.

Beyond the saturation point, all you can see is whether, under increased queue
length, the server stays efficient or wastes effort.  Most servers lose
efficiency. To find out exactly what causes this, please read the ebook I linked
above.

The charts above are all of several versions of the server analyzed together. I
think it's a better idea to analyze only a single version of the server. Let's
look at the results for MySQL 5.6.27 only, because on this benchmark it beat the
other versions:

<pre>
clients qps
1 24456
2 45314
4 78024
8 126892
16 129029
32 127780
64 125526
128 124158
256 116337
</pre>

And the USL analysis of this data up to 8 clients:

![USL](/media/2015/11/usl.png)

There's such a small *kappa* coefficient that it should be ignored, however,
*sigma* is about 7.4%, which is quite significant and limits performance very
seriously. If you're familiar with the USL this provides concrete ideas about
what needs to be changed, and defines how far you can scale this server on this
type of configuration. When I was at Percona in the 2009-2011 timeframe we made
a business out of finding and alleviating those kinds of bottlenecks,
which is what led to XtraDB and eventually to Percona Server.

Takeaways:

1. When a system hits an obvious ceiling, don't try to fit the USL to the data
	beyond that point. Especially when you know the hardware explains the
	behavior simply.
2. What happens beyond that point does indicate something about the server's
	ability to go beyond saturation without completely spitting its cereal. We
	see essentially a flatline here, but in older versions of MySQL we used to
	see serious retrograde scalability.
3. The USL's parameters point you in the right direction to find and fix
	scalability problems.
4. There are lots of weird and contradictory results for lots of benchmarks.
   Benchmarketing is everywhere. [Learn about the Universal Scalability
	Law](https://www.vividcortex.com/resources/universal-scalability-law/) and
	innoculate yourself against lots of brain twisters.

[photo credit](https://upload.wikimedia.org/wikipedia/commons/2/20/Chicken_February_2009-1.jpg)
