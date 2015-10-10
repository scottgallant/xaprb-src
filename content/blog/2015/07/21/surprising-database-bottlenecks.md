---
categories:
  - Databases
date: 2015-07-21T14:46:49-07:00
title: "Surprising Database Bottlenecks You'll Never See Coming"
description: "Your database bottleneck isn't CPU, I/O, query performance or scalability after all."
image: /media/2015/07/bottleneck.jpg
---

I've been invited to speak at a joint meeting of the [Austin MySQL
meetup](http://www.meetup.com/austinmysql/events/223983360/) and the [Austin
Data Geeks meetup](http://www.meetup.com/austin-data-geeks/events/223983251/) on
Monday, July 27, 2015. This is a real treat for me. I have not spent much time
in this area but whenever I have I've loved it. And the community is large and
highly engaged at lots of levels. Here's the summary of the event:

> ... your database's performance is a lot less important to your business than the
> way you structure your engineering team. The interesting thing is that a lot
> of the most serious team, communication, and process bottlenecks in your
> business (the ones that make you miss ship deadlines, crash the site, and lose
> your best team members after repeated all-nighters) are actually driven by
> database issues, but not the way you think they are.

The topic may seem like a bit of a departure for me. I'll be talking about
organizational optimization, not mutex contention or query optimization. What
gives?

![Bottleneck](/media/2015/07/bottleneck.jpg)

<!--more-->

It's actually the direction I've been going over the last few years. While I was
at Percona I always tried to consult with
[Cary's](http://carymillsap.blogspot.com/) advice in mind: don't spend $1000
optimizing a $100 dollar problem. And as
[VividCortex's](https://vividcortex.com/) growth has exploded, it has taught me
an incredibly valuable series of lessons about how to apply the advice in new
ways.

As I [recently shared on
LinkedIn](https://www.linkedin.com/pulse/how-prioritize-anything-simple-roi-model-baron-schwartz),
the goal is to think creatively about how to make the largest impact for the
biggest portion of the business, whether that implies people, systems, customers
or other areas.

Traditional advice, and the advice I received when beginning to develop
VividCortex's sales process, was to hammer on the cost of downtime. I was deeply
skeptical of that for the same reasons [John Allspaw
is](http://www.kitchensoap.com/2013/01/03/availability-nuance-as-a-service/).
The simplistic math isn't truthful, and we all know it. But beyond that,
avoidance of a bad outcome is not the greatest value we can create for
customers. It's limited to the size of the potential downside, whereas the real
value we can create is adding to the top line, not the bottom line, and is
*unlimited*.

What is that impact? Think of it this way:

- Instead of making one DBA a little more productive (30% of a $200k fully
  loaded annual cost, say), what if we can make 80 developers more productive (5% of 80
  developers at $200k annually)?
- Instead of keeping the site online and fast for 5 minutes more per year, what
  if we can actually speed time-to-delivery of major IT initiatives by 18 calendar
  days?
- Instead of reducing the load on a database server by 50%, what if we can reduce the
  cycle time for continuous delivery ship-measure-iterate cycles from 2 days to 15 minutes?

How is this relevant to you, a MySQL user? You can do the same thing. By
understanding deeply the flow of work and communications in your organizations
and teams, you can actually have this kind of impact. You do not need any tools
(this is not a vendor pitch for VividCortex).

![Hair Sticks](/media/2015/07/hairsticks.jpg)

And databases aren't the only organizational bottlenecks. But it's often a truly
central one in many organizations. It's a huge lever for IT productivity.

Monday's talk follows on many of the topics that have resonated so deeply with
my readers and audiences over the last few years: [freezes don't prevent
outages](/blog/2014/11/29/code-freezes-dont-prevent-outages/), [everything is
about dependencies and statistical fluctuations](/blog/2014/05/24/the-goal/),
[databases are really complex and that's a
problem](/blog/2014/12/08/eventual-consistency-simpler-than-mvcc/), [teams are
systems too](https://vividcortex.com/blog/2015/07/05/teams-are-systems-too/).

I look forward to seeing you and sharing ideas that tie all these things
together. Please help share and promote; you can use the social media buttons at
the top of this article to do that.

Photo credits: [bottleneck](https://www.flickr.com/photos/icatus/2992269179/),
[hair pins](https://www.flickr.com/photos/grizzlymountainarts/6894273425/)
