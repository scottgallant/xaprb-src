---
title: "Automated, integrated sharding: the new killer database feature"
date: "2012-04-09"
url: /blog/2012/04/09/automated-integrated-sharding-the-new-killer-database-feature/
categories:
  - Databases
tags:
  - PostgreSQL
---
MySQL became wildly successful in part because it had built-in, simple replication. Sure, it had lots of interesting failure scenarios and was not great at first --- it is much better these days --- but it was nevertheless successful because there was a single, out-of-the-box, not-very-complex way to do replication. I have opined many times before that this was one of the killer features missing from PostgreSQL. I think that can large explain why MySQL became more popular more quickly.

The new killer feature is automatic sharding, in my opinion. If you're not accustomed to the word, "sharding" means partitioning of a large dataset across many servers.

It is easy to poke fun at [MongoDB's](http://www.mongodb.org/) current limitations, but for all that, it has a story to tell about sharding. There is One Right Way To Do It in MongoDB, and it's a part of the product.

I don't see sharding being added into the core of MySQL itself, but there are some very interesting efforts headed towards MySQL. There are at least the following companies providing sharding via a proxy or middleware solution, with a lot of other features also available in some products:

*   [Scalebase](http://www.scalebase.com/)
*   [ScaleArc](http://www.scalearc.com/)
*   [dbShards](http://www.dbshards.com/)
*   [ParElastic](http://www.parelastic.com/)

In addition, there are community-based efforts, such as [Shard-Query](http://code.google.com/p/shard-query/) and the [Spider](http://spiderformysql.com/) storage engine. And there's [MySQL (NDB) Cluster](http://mysql.com/products/cluster/), and commercial rip-out-and-plug-in replacements for MySQL such as [Clustrix](http://www.clustrix.com/).

Am I missing any? I probably am. You can see and talk to many of these companies at this week's [MySQL conference](http://www.percona.com/live/mysql-conference-2012/), by the way.


