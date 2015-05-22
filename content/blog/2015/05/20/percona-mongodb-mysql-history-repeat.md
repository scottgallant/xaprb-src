---
categories:
  - Conferences
  - Databases
date: 2015-05-20T13:51:18-05:00
title: "History Repeats: MySQL, MongoDB, Percona, and Open Source"
---

History is repeating again. MongoDB is breaking out of the niche into the
mainstream, performance and instrumentation are terrible in specific cases,
MongoDB isn't able to fix all the problems alone, and an ecosystem is growing.

![Leaf](/media/2015/05/leaf.jpg)

<!--more-->

This should really be a series of blog posts, because there's a book's worth of
things happening, but I'll summarize instead.

- MongoDB is in many respects closely following MySQL's development, 10 years
  offset. Single index per query, MyISAM-like storage engine, etc.
  [Background](/blog/2013/04/29/what-tokudb-might-mean-for-mongodb/).
- Tokutek built an excellent transactional storage engine and replaced
  MongoDB's, calling it TokuMX. Results were dramatically better performance
  (plus ACID).
- MongoDB's response was to buy WiredTiger and make it the default storage
  engine in MongoDB 3.0.
- Percona acquired Tokutek. A book should be written about this someday. The
  impact to both the MySQL and MongoDB communities cannot be understated. This
  changes everything. It also changes everything for Percona, which now has a
  truly differentiated product for both database offerings. This moves them
  solidly into being a product company, not just support/services/consulting; it
  is a good answer to the quandary of trying to keep up with the InnoDB
  engineers.
- Facebook acquired Parse, which is probably one of the larger MongoDB
  installations.
- Facebook's Mark Callaghan, among others, stopped spending all his time on
  InnoDB mutexes and so forth. For the last year or so he's been extremely
  active in the MongoDB community. The MongoDB community is lucky to have a
  genius of Mark's caliber finding and solving problems. There are others, but
  if Mark Callaghan is working on your open source product in earnest, you've
  arrived.
- VividCortex is building a MongoDB monitoring solution that will address many
  of the shortcomings of existing ones. (We have been a bit quiet about it, just
  out of busyness rather than a desire for secrecy, but now you know.) It's in
  beta now.
- Just as in MySQL, but even earlier, there are lots of -As-A-Service providers
  for MongoDB, and it's likely a significant portion of future growth happens
  here.
- MongoDB's conference is jaw-droppingly expensive for a vendor, to the point of
  being exclusive. At the same time, MongoDB hasn't quite recognized and
  embraced some of the things going on outside their walls. If you remember [the
  events of 2009 in the MySQL
  community](https://www.percona.com/blog/2009/02/05/announcing-percona-performance-conference-2009-on-april-22-23/),
  Percona's [announcement of an alternative MongoDB
  conference](https://www.percona.com/news-and-events/mongodb-events/mongodb-community-openhouse)
  might feel a little like deja vu. I'm not sure of the backstory behind this,
  though.

At the same time that history is repeating in the MongoDB world, a tremendous
amount of stuff is happening quietly in other major communities too. Especially
MySQL, but also in PostgreSQL, ElasticSearch, Cassandra and other opensource
databases. I'm probably only qualified to write about the MySQL side of things;
I'm pretty sure most people don't know a lot of the interesting things that are
going on that will have long-lasting effects. Maybe I'll write about that
someday.

In the meanwhile, I think we're all in for an exciting ride as MongoDB [proves me right](/blog/2013/01/10/bold-predictions-on-which-nosql-databases-will-survive/).

[Cropped image by 96dpi](https://www.flickr.com/photos/96dpi/3645537177/)
