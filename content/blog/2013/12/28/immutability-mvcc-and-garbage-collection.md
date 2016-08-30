---
title: Immutability, MVCC, and Garbage Collection
date: "2013-12-28"
url: /blog/2013/12/28/immutability-mvcc-and-garbage-collection/
description: "Immutable databases seem elegant but create difficult tradeoffs, sometimes resolved via short-term immutability."
image: "media/2013/12/uluru.jpg"
categories:
  - Databases
tags:
  - PostgreSQL
---

Not long ago I attended a talk about Datomic, which focused a lot on database
immutability and its benefits. I hope to illustrate why many database designs
are much more complicated than Datomic and its ilk. Although Datomic's design
can be presented as *advanced*, there's another side to the story, which also
holds true for similar databases such as CouchDB. It's a really difficult
problem space, and clean and elegant solutions without nasty edge cases are
difficult to design and implement.

![Uluru](/media/2013/12/uluru.jpg)

<!--more-->

### Datomic and Immutability

From what I can understand as a non-expert, the Datomic-in-a-nutshell is that it uses an append-only B-tree to record data, and never updates any data after it's written. The speaker wasn't sure what an append-only B-tree was, but his detailed description matched AOBTs perfectly. 

Why is this a big deal? Immutable data confers a lot of nice benefits. Here's an incomplete summary: 

*   It's more cacheable. 
*   It's easier to reason about. 
*   It's less likely to get corrupted from bugs and other problems. 
*   You can rewind history and view the state at any point in the past, by using an "old" root for the tree. 
*   Backups are simple: just copy the file, no need to take the database offline. In fact, you can do continuous backups. 
*   Replication is simple and fast. 
*   Crash recovery is simple and fast. 
*   It's easier to build a reliable system on unreliable components with immutability.

In general, immutability results in a lot of nice, elegant properties that just feel wonderful.

### Prior Art


Datomic is not alone in choosing immutability. I have seen at least two other databases architected similarly. Their creators highlighted many of the same benefits. In fact, if you listened to early talks from the architects of RethinkDB, you could practically search and replace "RethinkDB" with "Datomic". The same is true of CouchDB. To list a few links to RethinkDB's history: [1](http://techcrunch.com/2009/07/28/yc-funded-rethinkdb-a-mysql-storage-engine-built-from-the-ground-up-for-ssds/), [2](http://www.bytebot.net/blog/archives/2009/07/28/rethinkdb-all-the-rage-today), [3](http://carcaddar.blogspot.com/2009/10/append-only-databases.html). 

That last one links to [Accountants Don't Use Erasers,](http://blogs.msdn.com/b/pathelland/archive/2007/06/14/accountants-don-t-use-erasers.aspx) a blog post that brought append-only storage into the minds of many people at the time. 

Beyond databases, don't forget about filesystems, such as ZFS for example. Many of the same design techniques are employed here. 

Back to RethinkDB; around 2011 or so, its append-only design wasn't as prominent anymore. What happened? 

### Append-Only Blues


Immutability can be costly. Later I'll explain how those costs are paid by lots of databases that don't build so heavily around immutability, too. 

The first is that space usage grows forever. Logically, people insert facts, and then update the database with new facts. Physically, if what you're doing is just recording newer facts that obsolete old ones, then you end up with outdated rows. It may feel nice to be able to access those old facts, but the reality is most people don't want that, and don't want to pay the cost (infinitely growing storage) for it. 

The second is fragmentation. If entities are made of related facts, and some facts are updated but others aren't, then as the database grows and new facts are recorded, an entity ends up being scattered widely over a lot of storage. This gets slow, even on SSDs with fast random access. Solving this can be difficult and introduce lots of complexity.

The last is that a data structure or algorithm that's elegant and pure, but has one or more worst cases, can fall apart rather violently in real-world usage. That's because real-world usage is often much more diverse than you'd suspect. A database that has a "tiny worst-case scenario" can end up hitting that worst-case behavior for something rather more than a tiny fraction of its users. In my personal experience, it's often a significant *majority*. An easy example in a different domain is sort algorithms. Nobody implements straightforward best-performance-most-of-the-time sort algorithms because if they do, things go to hell in a handbasket rather quickly. Databases end up with similar [hard cases](https://groups.google.com/forum/#!topic/rethinkdb/Bcg1NPTU6do) to handle. 

There are more challenges, many of them much harder to talk about and understand (dealing with concurrency, for example), but these are the biggest, most obvious ones I've seen. 

As a result, you can see RethinkDB [quickly putting append-only, immutable design behind them](http://www.quora.com/In-the-RethinkDB-paper-one-of-the-references-is-to-An-append-only-index-tree-structure-which-was-supposed-to-appear-in-the-fourth-quarter-of-2009.-Is-this-paper-available-today). They stopped talking and writing about it. Their whitepaper, "Rethinking Database Storage", is gone from their website (rethinkdb.com/papers/whitepaper.pdf) but you can get it from the [wayback machine](https://web.archive.org/web/20090806193803/http://www.rethinkdb.com/papers/whitepaper.pdf). 

Reality sunk in and they had to move on from elegant theories to the bitterness of solving real-world problems. Whenever you hear about a new database, remember this: *this shit is really, really, really hard.* It typically takes many years for a database or storage engine to become production-ready in the real world. 

*Update: I can't find the reference anymore, but I think my view of history was
too simplistic; another important aspect of the story is that they just moved on
to other problems once the storage layer matured. I'm leaving the above para as
it is and I'd like to modify it to say that was my opinion at the time I wrote
this post.*

This blog post isn't about RethinkDB, though. I'm just using their evolution over time as an example of what happens when theory meets reality. 

### The CouchDB Problem


Around the same time as RethinkDB, a new NoSQL database called CouchDB was built on many of the same premises. In fact, I even blogged a quick overview of it as it started to become commercialized: [A gentle introduction to CouchDB for relational practitioners](/blog/2010/09/07/a-gentle-introduction-to-couchdb-for-relational-practitioners/). 

CouchDB had so many benefits from using immutability. MVCC (multi-version concurrency control), instant backup and recovery, crash-only design. But the big thing everyone complained about was... [compaction](http://wiki.apache.org/couchdb/Compaction). CouchDB became a little bit legendary for compaction. 

You see, CouchDB's files would grow forever, and you'd fill up your disks if you didn't do something about it. What could you do about it? CouchDB's answer was that you would periodically save a complete new database, without old versions of documents that had been obsoleted. It's a rewrite-the-whole-database process. The most obvious problem with this was that you had to reserve twice as much disk space as you needed for your database, because you needed enough space to write a new copy. If your disk got too full, compaction would fail because there wasn't space for two copies. 

And if you were writing into your database too fast, compaction would never catch up with the writes. And there were a host of other problems that could potentially happen. 

Datomic seems to have all of these problems too, up to and including stop-the-world blocking of writes (which in my book is complete unavailability of the database). 

### ACID MVCC Relational Databases


There is a class of database systems that has long been aware of the challenges with the database designs I've mentioned so far. Oracle, SQL Server, MySQL (InnoDB), and PostgreSQL all have arrived at designs that share some properties in common. These characteristics go some ways towards satisfying the needs of general-purpose database storage and retrieval in wide ranges of use cases, with excellent performance under mixed workloads. Depending on your workload, they arguably have relatively few and rare worst-case behaviors.

The properties are ACID transactions with multi-version concurrency control (MVCC). The relational aspect is ancillary. You could build these properties in a variety of non-SQL, non-relational databases. It just happens that the databases that have been around longer than most, and are more mature and sophisticated, are mostly relational. That's why these design choices and characteristics show up in relational databases -- no other reason as far as I know. 

Multi-version concurrency control lets database users see a consistent state of the database at a point in time, even as the database accepts changes from other users concurrently. 

How is this done? By keeping old versions of rows. These databases operate roughly as follows: when a row is updated, an old version is kept if there's any transaction that still needs to see it. When the old versions aren't needed any more, they're purged. Implementation details and terminology vary. I can speak most directly about InnoDB, which never updates a row in the primary key (which is the table itself). Instead, a new row is written, and the database is made to recognize this as the "current" state of the world. Old row versions are kept in a history list; access to this is slower than access to the primary key. Thus, the current state of the database is optimized to be the fastest to access. 

Now, about ACID transactions. Managing the write-ahead log and flushing dirty pages to disk is one of the most complex and hardest things an ACID database does, in my opinion. The process of managing the log and dirty pages in memory is called checkpointing. 

Write-ahead logging and ACID, caching, MVCC, and old-version-purge are often intertwined to some extent, for implementation reasons. This is a very complex topic and [entire](http://www.amazon.com/Transaction-Processing-Concepts-Techniques-Management/dp/1558601902/?tag=xaprb-20) [books](http://www.amazon.com/Transactional-Information-Systems-Algorithms-Concurrency/dp/1558605088/?tag=xaprb-20) (huge books!) have been written about it. 

What's happening in such a database is a combination of **short-term immutability**, read and write optimizations to save and/or coalesce redundant work, and continuous "compaction" and reuse of disk space to stabilize disk usage and avoid infinite growth. Doing these things a little bit at a time allows the database to gradually take care of business without needing to stop the world. Unfortunately, this is incredibly hard, and I am unaware of any such database that is completely immune to "furious flushing," "garbage collection pause," "compaction stall," "runaway purge," "VACUUM blocking," "checkpoint stall," or whatever it tends to be called in your database of choice. There is usually a combination of some kind of workload that can push things over the edge. The most obvious case is if you try to change the database faster than the hardware can physically keep up. Because a lot of this work is done in the background so that it's non-blocking and can be optimized in various ways, most databases will allow you to overwork the background processes if you push foreground activity hard enough. 

Show me a database and I'll show you someone complaining about these problems. I'll start out: [MySQL's adaptive flushing](http://www.mysqlperformanceblog.com/2012/09/04/adaptive-flushing-in-mysql-5-6/) has been beaten to death by Percona and Oracle engineers. [Riak on LevelDB](http://basho.com/leveldb-in-riak-1-2/): "On a test server, LevelDB in 1.1 saw stalls of 10 to 90 seconds every 3 to 5 minutes. In Riak 1.2, levelDB sometimes sees one stall every 2 hours for 10 to 30 seconds." [PostgreSQL's VACUUM can stall out](http://rhaas.blogspot.com/2011/03/troubleshooting-stuck-vacuums.html). I can go on. Every one of those problems is being improved somehow, but also can be triggered if circumstances are right. It's hard (impossible?) to avoid completely. 

### Evolution of Append-Only


The one-thing-at-a-time architecture of append-only systems, with periodic rewrites of the whole database, almost inevitably evolves into continuous, concurrent performing of the same tasks. Immutability can't live forever. It's better to do things continuously in the background than to accrue a bunch of debt and then pay it back in one giant blocking operation. 

That's how most mature, sophisticated databases with lots of scar tissue end up over time. The result is that Oracle (for example) can sustain combinations of workloads such as very high-frequency small operations reads and writes, together with days-long read-heavy and write-heavy batch processing, simultaneously, and providing good performance for both! That's hard to achieve in a database that can only do one thing at a time. 

So, keep that in mind if you start to feel like immutability is the elegant "hallelujah" solution that's been overlooked. It hasn't been overlooked. It's in the literature, and it's in the practice and industry. It's been refined for decades. It's well worth looking at the problems mature general-purpose databases have solved. New databases are overwhelmingly likely to run into some of them, and perhaps end up implementing the same solutions as well. (Note: I don't claim that there are no mature immutable databases. I'm not aware of any, but I bet there are some.)

Note that I am not SQL purist or a relational curmudgeon claiming that it's all been done before. I have a lot of respect for the genuinely new advancements in the field, and there is a hell of a lot of it, even in databases whose edge cases I just discussed.

What do you think? Also, if I've gone too far, missed something important, gotten anything wrong, or otherwise need some education myself, please let me know so I can a) learn and b) correct my error.

References/links that might be useful:

* http://www.datastax.com/dev/blog/compaction-improvements-in-cassandra-21

*Note: I've incorporated feedback into this blog post. It was needlessly
inflammatory. You can see the history on my GitHub account. Please point out
further areas I can improve it.*

[Pic Credit](https://www.flickr.com/photos/eedh/5993544190/)
