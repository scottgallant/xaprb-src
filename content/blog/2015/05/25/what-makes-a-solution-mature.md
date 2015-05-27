---
categories:
- Databases
date: 2015-05-25T14:40:42-04:00
title: "What Makes A Database Mature?"
description: "Read this before you ask me to buy your database."
tags:
  - PostgreSQL
---

Many database vendors would like me to take a look at their products and
consider adopting them for all sorts of purposes. Often they're pitching
something quite new and unproven as a replacement for mature, boring technology
I'm using happily.

I would consider a new and unproven technology, and I often have. As I've
written previously, though, [a real evaluation takes a lot of
effort](/blog/2014/06/08/time-series-database-requirements/), and that
makes most evaluations non-starters.

Perhaps the most important thing I'm considering is whether the product is
mature. There are different levels of maturity, naturally, but I want to
understand whether it's mature enough for me to take a look at it. And in that
spirit, it's worth understanding what makes a database mature.

![Bristlecone](/media/2015/05/bristlecone.jpg)

<!--more-->

For my purposes, maturity really means *demonstrated capability and quality with
a lot of thought given to all the little things*.
The database needs to demonstrate the ability to solve specific problems well and
with high quality. Sometimes this comes from customers, sometimes from a large
user community (who may not be customers).

Here are some things I'll consider when thinking about a database, in no
particular order.

- **What problem do I have?** It's easy to fixate on a technology and start
  thinking about how awesome it is. Some databases are just easy to fall in love
  with, to be frank. Riak is in this category. I get really excited about the
  features and capabilities, the elegance. I start thinking of all the things I
  could do with Riak. But now I'm putting the cart before the horse. I need to
  think about my problems first.
- **Query flexibility.** Does it offer sophisticated execution models to handle
  the nuances of real-world queries? If not, I'll likely run into queries that
  run much more slowly than they should, or that have to be pulled into
  application code. MySQL has lots of examples of this. Queries such as `ORDER
  BY` with a `LIMIT` clause, which are super-common for web workloads, did way
  more work than they needed to in older versions of MySQL. (It's better now,
  but the scars remain in my mind).
- **Query flexibility.** The downside of a sophisticated execution engine with
  smart plans is they can go very wrong. One of the things people like about
  NoSQL is the direct, explicit nature of queries, where an optimizer can't be
  too clever for its own good and cause a catastrophe. A database needs to make
  up its mind: if it's simple and direct, OK. If it's going to be smart, the bar
  is very high. A lot of NoSQL databases that offer some kind of "map-reduce"
  query capability fall into the middle ground here: key-value works great, but
  the map-reduce capability is far from optimal.
- **Data protection.** Everything fails, even things you never think about. Does
  it automatically check for and guard against bit rot, bad memory, partial page
  writes, and the like? What happens if data gets corrupted? How does it behave?
- **Backups.** How do you back up your data? Can you do it online, without
  interrupting the running database? Does it require proprietary tools? If you
  can do it with standard Unix tools, there's infinitely more flexibility. Can
  you do partial/selective backups? Differential backups since the last backup?
- **Restores.** How do you restore data? Can you do it online, without taking
  the database down? Can you restore data in ways you didn't plan for when
  taking the backup? For example, if you took a full backup, can you efficiently
  restore just a specific portion of the data?
- **Replication.** What is the model---synchronous, async, partial, blend?
  Statement-based, change-based, log-based, or something else? How flexible is
  it? Can you do things like apply intensive jobs (schema changes, big
  migrations) to a replica and then trade master-and-replica? Can you filter and
  delay and fidget with replication all different ways? Can you write to
  replicas? Can you chain replication? Replication flexibility is an absolutely
  killer feature. Operating a database at scale is very hard with inflexible
  replication. Can you do multi-source replication? If replication breaks, what
  happens? How do you recover it? Do you have to rebuild replicas from scratch?
  Lack of replication flexibility and operability is still one of the major pain
  points in PostgreSQL today. Of course, MySQL's replication provides a lot of
  that flexibility, but historically it didn't work reliably, and gave users a
  huge foot-gun. I'm not saying either is best, just that replication is hard
  but necessary.
- **Write stalls.** Almost every new database I've seen in my career, and a lot
  of old ones, has had some kind of write stalls. Databases are very hard to
  create, and typically it takes 5-10 years to fix these problems if they aren't
  precluded from the start (which they rarely are). If you don't talk about
  write stalls in your database in great detail, I'm probably going to assume
  you are sweeping them under the rug or haven't gone looking for them. If you
  show me you've gone looking for them and either show that they're contained or
  that you've solved them, that's better.
- **Independent evaluations.** If you're a solution in the MySQL space, for
  example, you're not really serious about selling until you've hired Percona to
  do evaluations and write up the results. In other database communities, I'd
  look for some similar kind of objective benchmarking and evaluations.
- **Operational documentation.** How good is your documentation? How complete?
  When I was at Percona and we released XtraBackup, it was clearly a
  game-changer, except that there was no documentation for a long time, and this
  hurt adoption badly. Only a few people could understand how it worked. There
  were only a few people inside of Percona who knew how to set it up and operate
  it, for that matter. This is a serious problem for potential adopters. The
  docs need to explain important topics like daily operations, what the database
  is good at, what weak points it has, and how to accomplish a lot of common
  tasks with it. Riak's documentation is fantastic in this regard. So is MySQL's
  and PostgreSQL's.
- **Conceptual documentation.** How does it work, really? One database that I
  think has been hurt a little bit by not really explaining how-it-works is
  NuoDB, which used an analogy of a flock of birds all working together. It's a
  great analogy, but it needs to be used only to set up a frame of reference for
  a deep-dive, rather than as a pat answer.  (Perhaps somewhat unfairly, I'm
  writing this offline, and not looking to see if NuoDB has solved this issue I
  remember from years ago.) Another example was TokuDB's Fractal Tree indexes.
  For a long time it was difficult to understand exactly what fractal tree
  indexes really did. I can understand why, and I've been guilty of the same
  thing, but I wasn't selling a database. People really want to feel sure they
  understand how it works before they'll entrust it with their data, or even
  give it a deep look. Engineers, in particular, will need to be convinced that
  the database is architected to achieve its claimed benefits.
- **High availability.** Some databases are built for HA, and those need to have
  a really clear story around how they achieve it. Walk by the booth of most new
  database vendors at a conference and ask them how their automatically HA
  solution works, and they'll tell you it's elegantly architected for zero
  downtime and seamless replacement of failed nodes and so on. But as we know,
  these are really hard problems. Ask them about their competition, and they'll
  say "sure, they claim the same stuff, but our code actually works in failure
  scenarios, and theirs doesn't." They can't all be right.
- **Monitoring.** What does the database tell me about itself? What can I
  observe externally? Most new or emerging databases are basically black boxes.
  This makes them very hard to operate in real production scenarios. Most
  people building databases don't seem to know what a good set of
  monitoring capabilities even looks like. MemSQL is a notable exception, as is
  Datastax Enterprise. As an aside, the astonishing variety of opensource databases
  that are not monitorable in a useful way is why I founded VividCortex.
- **Tooling.** It can take a long time for a database's toolbox to become robust
  and sophisticated enough to really support most of the day-to-day development
  and operational duties. Good tools for supporting the trickier emergency
  scenarios often take much longer. (Witness the situation with MySQL HA tools
  after 20 years, for example.) Similarly, established databases often offer
  rich suites of tools for integrating with popular IDEs like Visual Studio,
  spreadsheets and BI tools, migration tools, bulk import and export, and the like.
- **Client libraries.** Connecting to a database from your language of choice,
  using idiomatic code in that language, is a big deal. When we adopted Kafka at
  VividCortex, it was tough for us because the client libraries at the time
  were basically only mature for Java users. Fortunately, Shopify had
  open-sourced their Kafka libraries for Go, but unfortunately they weren't
  mature yet.
- **Third-party offerings.** Sometimes people seem to think that third-party
  providers are exclusively the realm of open-source databases, where third
  parties are on equal footing with the parent company, but I don't think this
  is true. Both Microsoft and Oracle have enormous surrounding ecosystems of
  companies providing alternatives for practically everything you could wish,
  except for making source code changes to the database itself. If I have only
  one vendor to help me with consulting, support, and other professional
  services, it's a dubious proposition. Especially if it's a small team that
  might not have the resources to help me when I need it most.

The most important thing when considering a database, though, is success
stories. The world is different from a few decades ago, when the good databases
were all proprietary and nobody knew how they did their magic, so proofs of
concept were a key sales tactic. Now, most new databases are opensource and the
users either understand how they work, or rest easy in the knowledge that they
can find out if they want. And most are adopted at a ratio of hundreds of
non-paying users for each paying customer.  Those non-paying users are a
challenge for a company in many ways, but at least they're vouching for the
solution.

Success stories and a community of users go together. If I can choose from a
magical database that claims to solve all kinds of problems perfectly, versus
one that has broad adoption and lots of discussions I can Google, I'm not going
to take a hard look at the former. I want to read online about use cases,
scaling challenges met and solved, sharp edges, scripts, tweaks, tips and
tricks. I want a lot of Stack Exchange discussions and blog posts. I want to see
people using the database for workloads that look similar to mine, as well as
different workloads, and I want to hear what's good and bad about it.
(Honest marketing helps a lot with this, by the way. If the company's own claims
match bloggers' claims, a smaller corpus online is more credible as a
result.)

![Roots](/media/2015/05/roots.jpg)

These kinds of dynamics help explain why most of the fast-growing emerging
databases are opensource.  Opensource has an automatic advantage because of free
users vouching for the product.  Why would I ever consider a proof-of-concept to
do a sales team a favor, at great cost and effort to myself, when I could use an
alternative database that's opensource and has an active community discussing
the database? In this environment, the proof of concept selling model is
basically obsolete for the mass market. It may still work for specialized
applications where you'll sell a smaller number of very pricey deals, but it
doesn't work in the market of which I'm a part.

In fact, I've never responded positively to an invitation to set up a PoC for a
vendor (or even to provide data for them to do it). It's automatically above my
threshold of effort. I know that no matter what, it's going to involve a huge
amount of time and effort from me or my teams.

There's another edge-case---databases that are built in-house at a specific
company and then are kicked out of the nest, so to speak. This is how Cassandra
got started, and Kafka too. But the difference between a database that works
internally for a company (no matter how well it works for them) and one that's
ready for mass adoption is *huge*, and you can see that easily in both of those
examples. I suspect few people have that experience to point to, but probably a
lot of readers have released some nifty code sample as open-source and seen how
different it is to create an internal-use library, as opposed to one that'll be
adopted by thousands or more people.

Remarkably few people at database companies seem to understand the
things I've written about above. The ones who do---and I've named some of
them---might have great success as a result. The companies who aren't run by
people who have actually operated databases in their target markets recently,
will probably have a much harder time of it.

I don't make much time to coach companies on how they should approach me. It's
not my problem, and I feel no guilt saying no without explanation. (One of my
favorite phrases is "no is a complete sentence.") But enough companies have
asked me, and I have enough friends at these companies, that I thought it would
be helpful to write this up. Hopefully this serves its intended purpose and
doesn't hurt any feelings. Please use the comments to let me know if I can
improve this post.

[Bristlecone pine by
yenchao](https://www.flickr.com/photos/yenchao/9187247776/), [roots by
mclcbooks](https://www.flickr.com/photos/39877441@N05/4672973273/)
