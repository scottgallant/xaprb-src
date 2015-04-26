---
title: MySQL replication breaks single-threaded limitation?
date: "2009-04-17"
url: /blog/2009/04/17/mysql-replication-breaks-single-threaded-limitation/
categories:
  - Databases
---
It's a feature preview with many limitations, but [this is still good news](http://larsthalmann.blogspot.com/2009/04/feature-preview-multi-threaded-slave.html). This has been a pretty severe performance limitation for replication in MySQL, which has prompted many a [workaround](http://www.maatkit.org/doc/mk-slave-prefetch.html).

Interestingly, the feature preview is based on MySQL 5.1, which has recently seemed to be getting some [significant](http://www.mysqlperformanceblog.com/2009/04/06/mysql-and-ibm/) [changes](http://s.petrunia.net/blog/?p=52) even though it's a GA release. Does this signal a change to MySQL's release cycle, which has sometimes been characterized as too long? More good news?


