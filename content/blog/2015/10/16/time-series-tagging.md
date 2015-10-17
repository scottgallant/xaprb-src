---
author: Baron Schwartz
categories:
- Databases
date: 2015-10-16T20:04:28-04:00
description: "Why would you want tagging functionality in a time series database?"
title: The Case For Tagging In Time Series Data
image: /media/2015/10/tagged.jpg
---

A while ago I wrote a blog post about [time series database
requirements](/blog/2014/06/08/time-series-database-requirements/) that has been
amazingly popular. Somewhere close to a dozen companies have told me they've
built custom in-house time series databases, and that blog post was the first
draft of a design document for it.

One of the things I said in the post was that I had no use for the "tagging"
functionality I've seen in time series databases such as OpenTSDB. I've since
reconsidered, although I think the functionality I now want is a bit different.

![tagged](/media/2015/10/tagged.jpg)

<!--more-->

What does it mean to "tag" metrics? Typically, many time series databases let
you add name=value pairs (tags) to individual time series points (observations).
For example, you measure CPU usage to be 59% at 3:41PM on host inst413, and you tag
this measurement as "shard=81" because inst413 holds data for shard 81.

The use case for this is that you can now aggregate and filter metrics, looking
at for example CPU usage for all of the shard 81 hosts at a point in time.

Tags are typically attached to individual points in the systems I'm aware of,
rather than being attached to a host or similar, because the assumption is that
they'll change over time. You might move shard 81's data to a different set of
servers. You might destroy host inst413 and rebuild it, and it might not even be
a database anymore.

For my purposes at [VividCortex](https://www.vividcortex.com/), I want "tags" to
help slice-and-dice-and-filter for a variety of customer scenarios.

- We currently can show you Top Queries by total time, and Top Queries by the
  count of queries that lack indexes. Customers want to see Top
  Queries by total time, filtered to show only those that lack indexes.
- We can show you Top Users by total time, indicating the total service demand
  placed on a set of hosts by queries running against them from a particular
  user. But what our customers want is to see Top Queries by total time,
  filtered to those that come from a specific user.

There are a variety of cases where we want to decouple the metrics from the
filtering that can be applied to them. Some we can support by joining together
related metrics, at some cost on our backend; some we cannot currently do as
well as we want, or in the way we want.

However, I do not like one thing about the common tagging functionality. I don't
like that individual metric points all have to bear the burden of every tag for
every point.

Instead, I view tags as *time series facts that exist during some time
interval.* And I think these should be applicable to the metric or the host (but
I don't see a use case where I want them per point in a metric). For example, 
a query doesn't use an index. I can tag the query's metrics as "no_index=true"
from the timestamp I first observe that, till the timestamp that I observe it
using an index. These durations can be open-ended, in which case they apply for
all time.

Similarly, I can tag the host as "shard=81" during the time that this host
carried that shard's data.

Finally, the tags need to permit multiple values. Imagine a query that is run by
several different users; we wouldn't want a uniqueness constraint on it.
"user=nagios" and "user=vividcortex" should be able to coexist for the query
"SHOW GLOBAL STATUS" in MySQL, to mention a real-life use case. Without this
capability, a search for all queries that the vividcortex user runs wouldn't
work as expected.

Photo credits: [tagged](https://www.flickr.com/photos/jdhancock/3814523970/)
