---
title: "Early-Warning Is an Unknown Unknown"
date: "2013-10-08"
categories:
  - Monitoring
  - Guest Posts
---

*This post originally appeared on [O'Reilly Radar](http://radar.oreilly.com/2013/10/early-warning-is-an-unknown-unknown.html).*

In 2002, US Secretary of State Donald Rumsfeld [told a reporter](http://www.youtube.com/watch?v=GiPe1OiKQuk) that not only don’t we know everything important, but sometimes we don’t even know what knowledge we lack:

>   There are known knowns; there are things we know we know. We also know there are known unknowns; that is to say we know there are some things we do not know. But there are also unknown unknowns – the ones we don’t know we don’t know.

One of the purposes of monitoring is to build early-warning systems to alert of problems before they become serious. But how can we recognize a failure in its early stages? It’s a thorny question.

As hard as it seems, it’s even harder than you think it is. To illustrate, we can ask a seemingly simple related question: can we reliably recognize problems after they’ve become serious, perhaps to the point of causing downtime? Even this is hard. That’s because no matter how many failures you’ve seen in systems, you can pretty much guarantee that someday in the future you’ll be surprised by an issue you never could have imagined until you saw it.

Not to get all Rumsfeld on you, but we’re talking about unknown unknowns.

### Early Detection

I have been pondering this issue–being proactive instead of reactive–for years. When I worked at Percona I surveyed hundreds of cases of customer downtime, poring through notes and email threads, examining all the data I had and trying to determine what caused the downtime and how to prevent it. The result was two white papers ([downtime](http://www.percona.com/about-us/mysql-white-paper/causes-of-downtime-in-production-mysql-servers), [how to prevent it](http://www.percona.com/about-us/mysql-white-paper/preventing-mysql-emergencies)).

How could someone have detected all of those problems in the making? There’s a huge variety of problems, and to answer this question it might be useful to categorize system failures. Here’s a quick list, which might not be exhaustive, but it’ll serve the purpose:

*    **Dead**. The system isn’t alive (the process or server isn’t running, for example).
*    **Unreachable**. The system may be alive somewhere, but you can’t connect to it.
*    **Unresponsive**. You can connect to the system, but it doesn’t respond to your requests.
*    **Aborting**. You can ask the system to do work, and it starts but can’t finish.
*    **Slow**. You can ask the system to do work, but it doesn’t happen fast enough to matter.
*    **Wrong**. The system responds but does something wrong, e.g. due to unexpected state.

Now try to think of how you’d detect these things early. It’s hard, because the system in question (an app or database server, perhaps) is likely dependent on many other systems and resources, as well as data and system load. Some resources have hard limits–disk space, for example, isn’t elastic. There’s usually no slowdown: the server works until the last byte is filled up, and then abruptly starts failing, perhaps even getting stuck on a blocked system call.

External resources are even worse because they’re dependent on things happening outside. DNS is a great example; think of any software you’ve written. How will it react if a name lookup fails? We can mention lots of types of resources that can fail or get used up: port range, filehandle limits, memory limits, CPU cycles, and so on. What if the resource you’re relying on is dependent on another resource? And what about errors, such as replication getting behind or stopping, disk or memory corruption, and so on? How can you detect these?

Resources with unclear limits or burstable capacity can be even harder to understand. Just what is the maximum capacity of your DNS server, anyway? At what point will traffic exceed its ability to respond promptly and consistently? If you don’t know this, how can you predict a failure in advance and give early warning?

### The State of the Monitoring Union

I don’t think this is a tractable problem with current monitoring systems and practices. Let’s take Nagios as an example: it’s reasonably good at detecting whether services are reachable and alive, but beyond that, it has no system-specific smarts. The sysadmin is expected to use plugins to map domain state into Nagios’s OK, WARN, CRIT, and UNKNOWN. Thus, Nagios’s answer is to pass the buck to the operations staff. We love to hate Nagios right now, but Sensu App doesn’t do anything fundamentally different in this regard, either.

Alive-or-dead checks don’t provide early warnings. Nagios plugins often try to do that with thresholds. Some things are reasonably amenable to thresholds. With enough care, for example, one can often set thresholds on disk fullness at appropriate levels to provide an early warning of a disk filling up. As I discovered at Percona, full disks are a major cause of downtime, so this might be sensible to do (though I think it’s still a blunt instrument). But most systems, and the resources they rely on, are far too complex to yield to a threshold-based approach. There are several reasons for this:

Most systems are dynamic with respect to resource consumption, and thresholds are wrong instantly, for every system, for every moment of the day. Baselining and similar techniques improve things, but don’t solve this problem completely. Resource consumption doesn’t indicate whether something is wrong–the resources are there to be used, after all. Most of the time all you’ll get are false alarms. There are way too many resources, used in far too many different ways, to put thresholds on them all.

In the end, the system administrator is on the horns of a dilemma: should I monitor for every possible failure mode I can imagine? Or just the ones I’ve seen before? What about the ones I can’t imagine and haven’t seen yet? And if I monitor as completely as I think I can, will I get too many false positives? If you haven’t been down this path before, I can give you a spoiler alert: here be false-positive dragons.

### Systematic Organizing Principles

I think one of the things that’s missing in the current crop of monitoring tools is a systematic approach to problem detection and resolution. We badly need organizing principles to guide us, or we’ll be flailing around in a Rube Goldberg machine without being able to see which wires are connected to which switches.

That’s why I think **workload** should be regarded as of primary importance. We have servers to do work for us. We don’t measure a systems’ success by how busy the CPUs and disks are, or how low the cache hit ratio is. We measure success by how much work the system can do for us, and how consistently. In other words, we want to know the speed and quality of getting-work-done.

The second guiding principle I propose is to **measure and analyze what you care about**. If you agree that the rate and quality of task completion is the most important thing to measure in systems, then I suggest that you should be measuring at least throughput and response time of those tasks, and analyzing those for degradation that can provide early warnings of interruptions of service. On the other hand, I suggest being very skeptical of measuring and alerting on things that are not directly related to work-getting-done. For more on this topic, see Alois Reitbauer’s related blog post, [Building an Alerting System That Really Works](http://programming.oreilly.com/2013/09/building-an-alerting-system-that-really-works.html).

A third principle I suggest is that, due to the size and complexity of modern systems, you should **never alert about something that can’t be fixed**. The buzzword for this is “actionable alerts.” The cognitive load of unfixable alarms will make operations staff send alerts directly to /dev/null. It’s a pretty short path from there to the monitoring system becoming shelfware.

“Actionable” is worth exploring more. As an example, MySQL replication is always delayed by some amount; the question is how much. When a master’s load increases too much, the replica can’t keep up. You need to solve this problem–and there are many ways to do s –but in the most basic sense, you can’t do anything about a replica that’s behind. What would you do, anyway? Kill the server? Skip replicating a bunch of events? These just take a lagged system and turn it into a broken or dead one. An alert on delayed replication is not actionable because once the replica is behind, all you can do is wait and let it catch up, and that specific incident can’t be fixed. Instead of sending an alert, this is the type of information that should be exposed in a non-intrusive way (such as a graph) for a DBA to address in the normal course of events.

Similarly, if you alert on high CPU utilization, my experience is you’ll probably drive yourself nuts. You might think “I’ll find out if a rogue process runs,” but you’ll really find out when backups run instead. You’ll get a hundred “Oh, it’s because it’s doing work we’ve asked it to do” incidents for every “That’s not supposed to be happening!” event.

### Comprehensive Alerting

Should you try to set up early-warning systems for everything that could possibly go wrong? Even if you were able to do that (and I’ve argued that you can’t), I’d say no. My experience is that attempting complete coverage of all possible failure scenarios leads to false-alarm madness. And much like company policies that are written to forbid behavior that’s obviously unacceptable, I think we should focus our efforts on things that are likely to provide some ROI.

So I suggest that instead of trying to predict and guard against all possible failure modes, most people should learn from past mistakes, assess the risks (risk = probability * severity), and guard against the most common and serious ones. Disks getting full, for example, is a no-brainer. High CPU load and replication delay are not.

I’ll be speaking about this topic as part of a [broader presentation at Velocity New York](http://velocityconf.com/velocityny2013/public/schedule/detail/31361/) on October 14th. I intend to cover much more material–this is just a small part of it. But I’d be interested to hear your thoughts on this and related topics. It’ll help make my presentation better!


