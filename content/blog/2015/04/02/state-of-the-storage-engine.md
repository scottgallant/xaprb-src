---
categories:
  - Databases
date: 2015-04-02T03:51:18-05:00
title: State Of The Storage Engine - DZone
description: "For the first time in decades, there's actual innovation in databases."
image: /media/2015/04/boardwalk.jpg
tags:
  - PostgreSQL
  - MongoDB
---

I contributed an article on [modern database storage
engines](http://www.dzone.com/articles/state-storage-engine) to the recent
[DZone Guide To Database and Persistence
Management](http://dzone.com/research/guide-to-databases). I'm cross-posting the
article below with DZone's permission.

![Boardwalk](/media/2015/04/boardwalk.jpg)

<!--more-->

Readers of this guide already know the database world is undergoing rapid change. From relational-only, to NoSQL and Big Data, the technologies we use for data storage and retrieval today are much different from even five years ago.

Today’s datasets are so large, and the workloads so demanding, that one-size-fits-all databases rarely make much sense. When a small inefficiency is multiplied by a huge dataset, the opportunity to use a specialized database to save money, improve performance, and optimize for developer productivity and happiness can be very large. And today’s solid-state storage is vastly different from spinning disks, too. These factors are forcing fundamental changes for database internals: the underlying algorithms, file formats, and data structures. As a result, modern applications are often backed by as many as a dozen distinct types of databases (polyglot persistence). These trends signal significant, long-term change in how databases are built, chosen, and managed.

>Most companies can afford only one or two proper in-depth evaluations for a new database.

### Textbook Architectures Lose Relevance

Many of today’s mature relational databases, such as MySQL, Oracle, SQL Server, and PostgreSQL, base much of their architecture and design on decades-old research into transactional storage and relational models that stem from two classic textbooks in the field—known simply as [Gray & Reuters](http://www.amazon.com/dp/1558601902) and [Weikum & Vossen](http://www.amazon.com/dp/1558605088). This “textbook architecture” can be described briefly as having:

* Row-based storage with fixed schemas
* B-Tree primary and secondary indexes
* ACID transaction support
* Row-based locking
* MVCC (multi-version concurrency control) implemented by keeping old row versions

But this textbook architecture has been increasingly questioned, not only by newcomers but by leading database architects such as [Michael Stonebraker](http://slideshot.epfl.ch/play/suri_stonebraker). Some new databases depart significantly from the textbook architecture with concepts such as wide-row and columnar storage, no support for concurrency at all, and eventual consistency. It’s worth noting that although NoSQL databases represent obvious changes in the data model and language—how developers access the database—not all NoSQL databases innovate architecturally. Coping with today’s data storage challenges often requires breaking from tradition architecturally, especially in the storage engine.
### Log-Structured Merge Trees

One of the more interesting trends in storage engines is the emergence of log-structured merge trees (LSM trees) as a replacement for the venerable B-Tree index. LSM trees are now about two decades old, and LevelDB is perhaps the most popular implementation. Databases such as Apache HBase, Hyperdex, Apache Cassandra, RocksDB, WiredTiger, and Riak use various types of LSM trees. 

LSM trees work by recording data, and changes to the data, in immutable segments or runs. The segments are usually organized into levels or generations. There are several strategies, but the first level commonly contains the most recent and active data, and lower levels usually have progressively larger and/or older data, depending on the leveling strategy. As data is inserted or changed, the top level fills up and its data is copied into a segment in the second level. Background processes merge segments in each level together, pruning out obsolete data and building lower-level segments in batches. Some LSM tree implementations add other features such as automatic compression, too. There are several benefits to this approach as compared to the classic B-Tree approach:


* Immutable storage segments are easily cached and backed up
* Writes can be performed without reading first, greatly speeding them up
* Some difficult problems such as fragmentation are avoided or replaced by simpler problems
* Some workloads can experience fewer random-access I/O operations, which are slow
* There may be less wear on solid-state storage, which can’t update data in-place
* It can be possible to eliminate the B-Tree “write cliff,” which happens when the working set no longer fits in memory and writes slow down drastically

Although many of the problems with B-Tree indexes can be avoided, mitigated, or transformed, LSM tree indexes aren’t a panacea. There are always trade-offs and implementation details. The main set of trade-offs for LSM trees are usually explained in terms of amplification along several dimensions. The amplification is the average ratio of the database’s physical behavior to the logical behavior of the user’s request, over the long-term. It’s usually a ratio of bytes to bytes, but can also be expressed in terms of operations, e.g. number of physical I/O operations performed per logical user request.

* **Write amplification** is the multiple of bytes written by the database to bytes changed by the user. Since some LSM trees rewrite unchanging data over time, write amplification can be high in LSM trees.
* **Read amplification** is how many bytes the database has to physically read to return values to the user, compared to the bytes returned. Since LSM trees may have to look in several places to find data, or to determine what the data’s most recent value is, read amplification can be high.
* **Space amplification** is how many bytes of data are stored on disk, relative to how many logical bytes the database contains. Since LSM trees don’t update in place, values that are updated often can cause space amplification.


In addition to amplification, LSM trees can have other performance problems, such as read and write bursts and stalls. It’s important to note that amplification and other issues are heavily dependent on workload, configuration of the engine, and the specific implementation. Unlike B-Tree indexes, which have essentially a single canonical implementation, LSM trees are a group of related algorithms and implementations that vary widely.


There are other interesting technologies to consider besides LSM trees. One is [Howard Chu](https://symas.com/getting-down-and-dirty-with-lmdb-qa-with-symas-corporations-howard-chu-about-symass-lightning-memory-mapped-database/)’s LMDB (Lightning Memory-Mapped Database), which is a copy-on-write B-Tree. It is widely used and has inspired clones such as [BoltDB](https://github.com/boltdb/bolt), which is the storage engine behind the up-and-coming [InfluxDB](http://influxdb.com/) time-series database. Another LSM alternative is [Tokutek’s](http://www.tokutek.com/) fractal trees, which form the basis of high-performance write and space-optimized alternatives to MySQL and MongoDB.

### Evaluating Databases With Log-Structured Merge Trees

No matter what underlying storage you use, there’s always a trade-off. The iron triangle of storage engines is this:


You can have **sequential reads without amplification, sequential writes without amplification, or an immutable write-once design**—<i>pick any two</i>.


Today’s emerging Big Data use cases, in which massive datasets are kept in raw form for a long time instead of being summarized and discarded, represent some of the classes of workloads that can potentially be addressed well with LSM tree storage (time-series data is a good example). However, knowledge of the specific LSM implementation must be combined with a deep understanding of the workload, hardware, and application. 


>...although NoSQL databases represent obvious changes in the data model and language, not all NoSQL databases innovate architecturally.

Sometimes companies don’t find a database that’s optimized for their exact use case, so they build their own, often borrowing concepts from various databases and newer storage engines to achieve the efficiency and performance they need. An alternative is to adapt an efficient and trusted technology that’s almost good enough. At VividCortex, we ignore the relational features of MySQL and use it as a thin wrapper around InnoDB to store our large-scale, high-velocity time-series data.


Whatever road you take, a good deal of creativity and experience is required from architects who are looking to overhaul their application’s capabilities. You can’t just assume you’ll plug in a database that will immediately fit your use case. You’ll need to take a much deeper look at the storage engine and the paradigms it is based on.


> **Baron Schwartz** is the founder and CEO of [VividCortex](https://vividcortex.com), the best way to see what your production database servers are doing. He is the author of High Performance MySQL and many open-source tools for MySQL administration. He’s also an Oracle ACE and frequent participant in the PostgreSQL community.


To read the full report free of charge, download the
[DZone Guide To Database and Persistence
Management](http://dzone.com/research/guide-to-databases).

Cropped boardwalk image by [Nuno Silva](https://unsplash.com/nmsilva).
