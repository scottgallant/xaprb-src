---
title: Duplicate index checker version 1.9 released
date: "2006-10-01"
url: /blog/2006/10/01/duplicate-index-checker-version-19-released/
categories:
  - Databases
---
I've made more improvements to the [duplicate index checker](/duplicate-index-checker/). I addressed a [MySQL bug](http://bugs.mysql.com/bug.php?id=22632) [Roland Bouman](http://rpbouman.blogspot.com/) mentioned to me, added more tests to the suite, and made changes so it considers more types of indexes now ([HASH](http://dev.mysql.com/doc/refman/5.0/en/create-index.html), BTREE, [SPATIAL](http://dev.mysql.com/doc/refman/5.0/en/creating-spatial-indexes.html)). I made no changes to the foreign key checking.

The [bug Roland mentioned](http://bugs.mysql.com/bug.php?id=22632) is a problem with `SHOW CREATE TABLE` that causes MySQL to show an index as type HASH when it's really a BTREE. I found a pretty easy workaround.

In the meantime, Roland has released a SQL-only method to find duplicate indexes in newer versions of MySQL. It's an excellent use of the INFORMATION_SCHEMA. He also wrote [an article on finding duplicate indexes](http://www.oreillynet.com/databases/blog/2006/09/_finding_redundant_indexes_usi.html) for O'Reilly Database, and for his own blog too.

Daniel Schneller has also continued to work on a [Java implementation of a GUI tool to find duplicate and redundant indexes](http://mysql-index-analyzer.blogspot.com/).


