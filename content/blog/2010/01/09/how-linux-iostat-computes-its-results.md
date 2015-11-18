---
title: How Linux iostat Computes Metrics
date: "2010-01-09"
url: /blog/2010/01/09/how-linux-iostat-computes-its-results/
image: "media/2010/01/layers.jpg"
categories:
  - Databases
  - Open Source
  - Operations
  - Monitoring
tags:
  - PostgreSQL
---
The `iostat` tool is one of the most important for measuring disk performance, which of course is very relevant for database administrators, whether your chosen database is Postgres, MySQL, Oracle, or anything else that runs on GNU/Linux. Have you ever wondered where statistics like await (average wait for the request to complete) come from? If you look at the disk statistics the [Linux kernel makes available through files such as /proc/diskstats](http://www.mjmwired.net/kernel/Documentation/iostats.txt), you won't see await there. How does iostat compute await? For that matter, how does it compute the average queue size, service time, and utilization? This blog post will show you how that's computed.


![Layers](/media/2010/01/layers.jpg)

<!--more-->

First, let's look at the fields in /proc/diskstats. The order and location varies between kernels, but the following applies to 2.6 kernels. For reads and writes, the file contains the number of operations, number of operations merged because they were adjacent, number of sectors, and number of milliseconds spent. Those are available separately for reads and writes, although iostat groups them together in some cases. Additionally, you can find the number of operations in progress, total number of milliseconds during which I/Os were in progress, and the weighted number of milliseconds spent doing I/Os. Those are not available separately for reads and writes.

The last one is very important. The field showing the number of operations in progress is transient -- it shows you the instantaneous value, and this "memoryless" property means you can't use it to infer the number of I/O operations that are in progress on average. But the last field has memory, because it is defined as follows:

> Field 11 -- weighted # of milliseconds spent doing I/Os This field is incremented at each I/O start, I/O completion, I/O merge, or read of these stats by the number of I/Os in progress (field 9) times the number of milliseconds spent doing I/O since the last update of this field. This can provide an easy measure of both I/O completion time and the backlog that may be accumulating. 

So the field indicates the total number of milliseconds that all requests have been in progress. If two requests have been waiting 100ms, then 200ms is added to the field. And thus it records what happened over the duration of the sampling interval, not just what's happening at the instant you look at the file. We'll come back to that later.

Now, given two samples of I/O statistics and the time elapsed between them, we can easily compute everything iostat outputs in -dx mode. I'll take them slightly out of order to reflect how the computations are done internally.

*   rrqm/s is merely the incremental merges divided by the number of seconds elapsed.
*   wrqm/s is similarly simple, and r/s, w/s, rsec/s, and wsec/s are too.
*   avgrq-sz is the number of sectors divided by the number of I/O operations.
*   avgqu-sz is computed from the last field in the file -- the one that has "memory" -- divided by the milliseconds elapsed. Hence the units cancel out and you just get the average number of operations in progress during the time period. The name (short for "average queue size") is a little bit ambiguous. This value doesn't show how many operations were queued but not yet being serviced -- it shows how many were *either* in the queue waiting, *or* being serviced. The exact wording of the kernel documentation is "...as requests are given to appropriate struct request_queue and decremented as they finish."
*   %util is the total time spent doing I/Os, divided by the sampling interval. This tells you how much of the time the device was busy, but it doesn't really tell you whether it's reaching its limit of throughput, because the device could be backed by many disks and hence capable of multiple I/O operations simultaneously.
*   await is the total time for all I/O operations summed, divided by the number of I/O operations completed.
*   svctm is the most complex to derive. It is the utilization divided by the throughput. You saw utilization above; the throughput is the number of I/O operations in the time interval.

Although the computations and their results seem both simple and cryptic, it turns out that you can derive a lot of information from the relationship between these various numbers.

I've shown how the numbers are computed, but now you might ask, why are those things true? Why are those the correct relationships to use when computing these metrics?

The answer lies in several interrelated theories and properties:

1. Queueing Theory. This is the study of "customers" arriving at "servers" to be
	serviced. In the disk's case, the customers are I/O requests, and the disks
	are the servers. Queueing theory explains the relationship between the length
	of the queue, the number of requests resident in the entire system at a given
	time, the amount of time spent waiting, the amount of time being serviced
	once you stop waiting and reach a device, and so on. The terminology iostat
	uses is rather confusing when compared to queueing theory's standard
	terminology. For example, avgqu-sz seems to be called "average queue size,"
	but strictly speaking, it is actually the average number of requests
	*resident*, not just queued. The number queued is a smaller number than those
	resident.
2. Little's Law. If you don't know Little's Law, you should really learn it. It
	states that in a stable system, where all requests eventually complete, then
	over the long run, L = &lambda;W, or as I prefer to state it, N=XR. The number of
	requests (customers) resident in the system (whether queued or in service) is
	L or N. It is equal to the arrival rate &lambda; (or throughput X) times the
	residence time W (or response time R).
3. The utilization law, &rho; = &lambda;S. This states that utilization is
	throughput times service time.

If you'd like to learn more about queueing theory and these relationships, I
encourage you to do so. It's really required material for anyone doing
performance-related work in my opinion. I also happen to have written what I
believe is the most accessible and comprehensible [introduction to queueing
theory](https://www.vividcortex.com/resources/queueing-theory/) available.

Image by [doug88888](https://www.flickr.com/photos/doug88888/3139395660).

