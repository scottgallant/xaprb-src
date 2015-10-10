---
categories:
  - Databases
date: 2015-03-31T03:51:18-05:00
title: Scaling Backend Systems at VividCortex
description: "How we scaled our systems to meet unusual demands."
image: /media/2015/03/fern.jpg
---

I wrote [a guest post for High
Scalability](http://highscalability.com/blog/2015/3/30/how-we-scale-vividcortexs-backend-systems.html)
about how we scale our backend systems at VividCortex. It's heavy on MySQL,
sprinkled with a little bit of Redis's magic pixie dust, and Kafka is also a key
part of the architecture.

![fern](/media/2015/03/fern.jpg)

<!--more-->

Important takeaways:

* Our workload is unusual in that some use cases require reading huge amounts of
  data with interactive response times. We have lots of time-series data, but
  not a typical time-series workload.
* Our data distribution is also weird.
* Read optimization is vital, but we are extremely write-heavy.
* We're sharded *and* partitioned.
* We run our systems on just a few low-end EC2 machines.
* Go is a huge part of our speed to market and cost efficiency.
* We use a "just enough micro-" services-oriented architecture.
* Our success with MySQL is probably not easy to duplicate with, say, Cassandra.
* Really careful data layout and creativity is key to optimization.
* InnoDB's clustered indexes are vitally important.
* We could probably improve upon this system by 2-4 orders of magnitude, but
  there would be cost and effort involved.

If that sounds interesting, [read the full
post](http://highscalability.com/blog/2015/3/30/how-we-scale-vividcortexs-backend-systems.html) for a lot more detail. It's about a 30 minute read.

Cropped fern image by [Jan Erik Waider](https://unsplash.com/photomarket).
