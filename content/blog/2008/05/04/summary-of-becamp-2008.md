---
title: Summary of beCamp 2008
date: "2008-05-04"
url: /blog/2008/05/04/summary-of-becamp-2008/
categories:
  - Conferences
---
Yesterday I went to [beCamp 2008](http://barcamp.org/beCamp2008) along with four roomfuls of other people interested in technology (perhaps close to 100 people total). The conference was a lot of fun. Not everything went as planned, but that was as planned. This was an [Open Spaces conference](http://martinfowler.com/bliki/OpenSpace.html) and I thought it worked very well. From an email [Eric Pugh](http://www.opensourceconnections.com/) sent:

> Basically it all boils down to:
> 
> Open Space is the Law of Two Feet: if anyone finds themselves in a place where they are neither learning nor contributing they should move to somewhere more productive. And from the law flow four principles:
> 
> *   Whoever comes are the right people
> *   Whatever happens is the only thing that could have
> *   Whenever it starts is the right time
> *   When it's over, it's over

### From Hadoop to Bang-Splat

I used the law of two feet a time or two. In fact, the first session I wanted to go to, which was about [Hadoop](http://hadoop.apache.org/core/) and [MapReduce](http://labs.google.com/papers/mapreduce.html), had no knowledgeable attendees. Someone overslept. OK, that's the way it goes: move along.

From there I went to a session about Unix command-line productivity. Most of the sessions I saw were traditional in that they had one person standing up talking and many people sitting and listening, but not all. This one had several clever command-line gurus mentioning their favorite power tips.

I learned about bang-splat and bang-dollar. The bangs have always gotten me in Bash: I avoid them because I've never felt like reading the Bash man page section on them. (Am I too lazy, or not lazy enough?) So it was great to hear some people say "bang-splat and bang-dollar are great" and then explain them. That was easy for me, and now I know how they can be useful to me.

This problem-first type of tip is great for me: tell me the problem, then how to solve it, rather than telling me what the solution is and leaving me guessing what kinds of problems I can solve with it. (The Bash man page is solution-first).

In case you're wondering, bang-splat substitutes the arguments to the last command, and bang-dollar substitutes the last argument of the last command. So, instead of this:

<pre>$ touch file1 file2 file3
$ rm file1 file2 file3</pre>

I can do this:

<pre>$ touch file1 file2 file3
$ rm !*</pre>

There were lots of other nice tips too.

### MySQL Performance

I ended up doing a talk on MySQL performance basics. I had no idea what the audience was looking for, so I winged it. I did make some slides, but most of the talk isn't on the slides. You can get the slides from [Percona's slide page](http://www.percona.com/presentations.html). It seemed to be useful to the folks attending, who had a wide variety of experience and knowledge about MySQL.

### Cloud Computing

This session began with a demo of how to create an entire application stack in a few minutes with [Cohesive Flexible Technologies](http://www.cohesiveft.com/). Someone else then demoed a similar thing using [RightScale](http://www.rightscale.com/). [rPath](http://www.rpath.com/)'s [Jeff Uphoff](http://blogs.conary.com/index.php/juphoff) was also in the room, but we didn't get to see a demo of that. During this session the talk turned to various topics including a little bit of the topics I wanted to hear about in the Hadoop session.

### Lunch

Lunch was catered Indian food provided by the [Rimm-Kaufman Group](http://www.rimmkaufman.com/). Yum.

### Large Scale Storage

This session was sort of a round-table. The two people who talked the most were [Josh Malone](http://www.cv.nrao.edu/~jmalone/) from the [National Radio Astronomy Observatory](http://www.nrao.edu/) and the [Library of Congress](http://www.loc.gov/), both of whom have a lot of storage needs they are unsure how to meet. Some people from UVA's library were there as well, but I didn't ask what they were working on.

This reminded me a lot of a [recent keynote Jacek Becla gave at another conference](http://en.oreilly.com/mysql2008/public/schedule/detail/1865). He's with the Stanford Linear Accelerator Center, who are going to be generating a lotta data pretty soon.

### High Availability Linux

This one started off with more from Josh Malone, who demoed [Nagios](http://www.nagios.org/) briefly and then talked about his storage and backup systems. He uses [BackupPC](http://backuppc.sourceforge.net/), which sounds pretty neat and very smart. We then talked about some of the things he's looking into doing, with audience suggestions to look into shared storage or [DRBD](http://www.drbd.org/). We also looked at [UltraMonkey](http://www.ultramonkey.org/) briefly -- it looks like it's stagnating, though. And the [Linux HA](http://linux-ha.org/) project.

### Google App Engine

Finally, someone showed us a [calculator application they'd built on Google App Engine](http://gi89.appspot.com/), including the code and talking about the data model somewhat. It looks like a neat idea, but the lock-in worries me, a sentiment that was voiced by many others in the room.


