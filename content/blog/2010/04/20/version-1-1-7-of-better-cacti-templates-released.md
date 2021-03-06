---
title: Version 1.1.7 of Better Cacti Templates released
date: "2010-04-20"
url: /blog/2010/04/20/version-1-1-7-of-better-cacti-templates-released/
categories:
  - Monitoring
  - Databases
  - Operations
  - Programming
tags:
  - PostgreSQL
---
I've released version 1.1.7 of the [Better Cacti Templates](http://code.google.com/p/mysql-cacti-templates/) project. This release includes a bunch of bug fixes, some new graphs for MySQL, and two new sets of graphs, for Redis graphing and for JMX graphing.

> [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production and I consider it far superior to Cacti. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.

There are [upgrade instructions](http://code.google.com/p/mysql-cacti-templates/wiki/UpgradingTemplates) on the project wiki for this and all releases. There is also a comprehensive tutorial on [how to create your own graphs and templates](http://code.google.com/p/mysql-cacti-templates/wiki/CreatingGraphs) with this project. Use the [project issue tracker](http://code.google.com/p/mysql-cacti-templates/issues/list) to view and report issues, and use the [project mailing list](http://groups.google.com/group/better-cacti-templates) to discuss the templates and scripts.

The full changelog follows.

<pre>
  * Added graphs for Innodb_row_lock_waits and Innodb_row_lock_time (issue 118).
  * Added graphs for the MyISAM key buffer memory consumption (issue 127).
  * The loadavg/users graphs failed when only 1 user was logged in (issue 131).
  * The Apache and Nginx graphs couldn't use the --port2 option (issue 129).
  * The InnoDB Log graph's unflushed_log should be GAUGE not COUNTER (issue 10).
  * Added graphs for InnoDB semaphore waits (issue 124).
  * Added Redis graphs (issue 90).
  * Added --openvz_cmd configuration and command-line option (issue 130).
  * Added --mysql_ssl configuration and command-line option (issue 103).
  * Added JMX graphs (--type jmx) (issue 139).
  * Big-integer math printf spec was missing a % character (issue 137).
  * Partially accepted patches from Artur Kaszuba (more remaining in issue 120).
</pre>


