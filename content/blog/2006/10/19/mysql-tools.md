---
title: "Open Tools for MySQL Administrators"
date: "2006-10-19"
categories:
  - Databases
  - Guest Posts
---

*This post originally appeared on [O'Reilly's blog](http://archive.oreilly.com/pub/a/mysql/2006/10/19/mysql-tools.html).*

<p><a href="http://www.mysql.com/">MySQL</a> provides some tools to monitor and troubleshoot a MySQL server, but they don't always suit a MySQL developer or administrator's common needs, or may not work in some scenarios, such as remote or over-the-web monitoring. Fortunately, the MySQL community has created a variety of free tools to fill the gaps. On the other hand, many of these are hard to find via web searches. In fact, web searches can be frustrating because they uncover abandoned or special-purpose, not ready-to-use projects. You could spend hours trying to find tools for monitoring and troubleshooting your MySQL servers. What's a tool-seeker to do?</p>

<p>Relax! I've already done the work, so you won't have to. I'll point you to the tools I've actually found useful. At the end of this article I'll also list those I didn't find helpful.</p>

<p>This article is about tools to discover and monitor the state of your server, so I won't discuss programs for writing queries, designing tables, and the like. I'm also going to focus exclusively on free and open source software.</p>

<h3>Tools to Monitor Queries and Transactions</h3>

<p>The classic tool for monitoring queries is <a href="http://jeremy.zawodny.com/mysql/mytop/">Jeremy Zawodny's mytop</a>. It is a Perl program that runs in a terminal and displays information about all connections in a tabular layout, similar to the Unix <code>top</code> program's process display. Columns include the connection ID, the connection's status, and the text of the current query. From this display you can select a query to <code>EXPLAIN</code>, kill a query, and a few other tasks. A header at the top of the display gives information about the server, such as version, uptime, and some statistics like the number of queries per second. The program also has some other functions, but I never found myself using them much.</p>

<p>There are mytop packages for various GNU/Linux distributions, such as Gentoo and Fedora Core, or you can install one from Jeremy's website. It is very small and has minimal dependencies. On the downside, it hasn't been maintained actively for a while and doesn't work correctly with MySQL 5.x.</p>

<p>A similar tool is <a href="http://mtop.sourceforge.net/">mtop</a>. It has a tabular process display much like mytop, and although it lacks some features and adds others, the two programs are very similar. It is also a Perl script and there are installation packages for some operating systems, or you can download it from SourceForge. Unfortunately, it is not actively maintained and does not work correctly on newer versions of MySQL.</p>

<p>Some programmers have also created scripts to output MySQL's process list for easy consumption by other scripts. An example is this <a href="http://forge.mysql.com/snippets/view.php?id=38">SHOW FULL PROCESSLIST</a> script, available from the always-useful <a href="http://forge.mysql.com/">MySQL Forge</a>.</p>

<p>My own contribution is <a href="/blog/2006/07/02/innotop-mysql-innodb-monitor/">innotop</a>, a MySQL and InnoDB monitor. As MySQL has become increasingly popular, InnoDB has become the most widely used transactional MySQL storage engine. InnoDB has many differences from other MySQL storage engines, so it requires different monitoring methods. It exposes internal status by dumping a potentially huge amount of semi-formatted text in response to the <code>SHOW INNODB STATUS</code> command. There's a lot of raw data in this text, but it's unusable for real-time monitoring, so I wrote innotop to format and display it conveniently. It is the main monitoring tool at my current employer.</p>

<p>Innotop is much more capable than the other tools I've mentioned, and can replace them completely. It has a list of processes and status information, and offers the standard functions to kill and explain queries. It also offers many features that are not in any other tool, including being able to list current transactions, lock waits, deadlock information, foreign key errors, I/O and log statistics, InnoDB row operation and semaphore statistics, and information on the InnoDB buffer pool, memory usage, insert buffer, and adaptive hash index. It also displays more standard MySQL information than mytop and its clones, such as compact, tabular displays of current and past status information snapshots. It is very configurable and has interactive help.</p>

<p>Installation is simple, because innotop is a ready-to-run Perl script, but there are no installation packages yet, so you must download it from my website.</p>

<p>There are also some web-based tools. There are two web-based mytop clones, <a href="http://sourceforge.net/projects/phpmytop/">phpMyTop</a> and <a href="http://sourceforge.net/projects/ajaxmytop/">ajaxMyTop</a>. These are useful when you don't have shell access and can't connect remotely to your database server, but can connect from a web server. ajaxMyTop is more recent and seems to be more actively developed. It also feels more like a traditional GUI program, because thanks to Ajax, the entire page does not constantly refresh itself.</p>

<p>Another web-based tool is the popular <a href="http://www.phpmyadmin.net/home_page/">phpMyAdmin</a> package. phpMyAdmin is a Swiss Army Knife, with features to design tables, run queries, manage users and more. Its focus isn't on monitoring queries and processes, but it has some of the features I've mentioned earlier, such as showing a process list.</p>

<p>Finally, if you need to monitor what's happening inside a MySQL server and don't care to--or can't--use a third-party tool, MySQL's own <code>mysqladmin</code> command-line program works. For example, to watch incremental changes to the query cache, run the command:</p>

	mysqladmin extended -r -i 10 | grep Qcache

<p>Of course, innotop can do that for you too, only better. Take a look at its "V" mode. Still, this can be handy when you don't have any way to run innotop.</p>

<h3>Tools to Monitor a MySQL Server</h3>

<p>Sometimes, rather than monitoring the queries running in a MySQL server, you need to analyze other aspects of the system's performance. You could use standard command-line utilities to monitor the resources used by the MySQL process on GNU/Linux, or you could run <a href="http://datacharmer.org/">Giuseppe Maxia's</a> helpful script to <a href="http://www.perlmonks.org/?node_id=559540">measure MySQL resource consumption</a>. This tool recursively examines the processes associated with the MySQL server's process ID, and prints a report on what it finds. For more information, read <a href="http://www.oreillynet.com/databases/blog/2006/07/measuring_resources_for_a_mysq_1.html">Giuseppe's own article on the O'Reilly Databases blog</a>.</p>

<p>The MySQL Forge website is an excellent place to discover tips, tricks, scripts, and code snippets for daily MySQL administration and programming tasks. For example, there's an entry to help you measure replication speed, a "poor man's query profiler" to capture queries as they fly by on the network interface, and much more.</p>

<p>Another excellent resource is <a href="http://hackmysql.com/mysqlreport">mysqlreport</a>, a well-designed program that turns MySQL status information into knowledge. It prints out a report of relevant variables, sensibly arranged for an experienced MySQL user. I find this tool indispensable when I have to troubleshoot a server without knowing anything about it in advance. For example, if someone asks me to help reduce load on a MySQL server that's running at 100 percent CPU, the first thing I do is to run mysqlreport. I can get more information by glancing at its output than I could in 10 minutes of talking to the customer. It immediately tells me where to focus my efforts. If I see a high key read ratio and a high percentage of index scans, I can immediately look for large indexes and a key buffer that's too small. That intuition could take many minutes to develop just by examining <code>SHOW STATUS</code>.</p>

<p>The mysqlreport website has full information on how to install and use the program, but better yet, there are excellent tutorials on how to interpret its output, with real examples. Some of these go into detail on MySQL internals, and I recommend them to any MySQL developer.</p>

<p>Another common task is setting up automated systems to monitor your server and let you know if it's alive. You could write your own monitor, or you could just plug in a ready-made one. According to a <a href="http://dev.mysql.com/tech-resources/quickpolls/monitoring-software.html">MySQL poll</a>, <a href="http://www.nagios.org/">Nagios</a> is the most popular tool for doing this. There's also a <a href="http://search.cpan.org/~clemensg/Watchdog-0.10/bin/mysql.monitor">Watchdog mysql monitor plugin</a> for <a href="http://www.kernel.org/software/mon/">mon</a>, the Linux scheduling and alert management tool. We currently use a home-grown system at my employer, but we're looking at using Nagios soon.</p>

<h3>Tools I Didn't Find Useful</h3>

<p>The <a href="http://www.quicomm.com/mysql_monitor_descript.htm">Quicomm MySQL Monitor</a> is a web-based administration tool similar to phpMyAdmin, not a monitor in the same sense as mytop or innotop. It offers relatively few features compared to phpMyAdmin.</p>

<p>Another web-based tool is <a href="http://www.fillon.org/mysysop/">MySysop</a>, which is billed as a "MySQL system optimizer", though it certainly doesn't do anything on its own to optimize a MySQL system. It offers recommendations I would not trust without doing enough investigation to arrive at the same conclusions. By the time I could install and run this system, I'd have long since run mysqlreport.</p>

<p>Finally, I've never understood how to even use the <a href="http://goog-mmaim.sourceforge.net/">Google mMaim (MySQL Monitoring And Investigation Module)</a>. It is part of Google's open source code contributions, and Google probably uses it internally to monitor its servers. However, it's not obvious to the rest of the world how to do this, as evidenced by the mailing list. The mailing list also reveals that Google released the code simply for the sake of releasing it. While I appreciate the gesture, I can't find any use for the code.</p>

<h3>Conclusion</h3>

<p>If you're trying to find tools for your own work, I recommend innotop and mysqlreport, and a healthy dose of command-line competence. I used to rely on mytop for my routine monitoring, but now I use innotop, because it shows much more information, including all-important details about transactions. When I need to analyze a server to discover what's wrong with it, it's impossible to match mysqlreport's instant snapshot of server health and activity. When I need to know about MySQL's resource consumption and performance, I augment standard command-line utilities with scripts, such as Giuseppe Maxia's.</p>

<p>There are certainly other tools, but the ones mentioned here are free and open source, have nearly every feature you can find in other tools, and do a lot you can't find elsewhere at all.</p>

<h3>Related Links</h3>

<ol>
<li><a href="/blog/2006/07/02/innotop-mysql-innodb-monitor/">innotop</a>, the most powerful MySQL and InnoDB monitor</li>

<li><a href="http://hackmysql.com/mysqlreport">mysqlreport</a>, a tool to make easy-to-ready MySQL status reports</li>

<li><a href="http://forge.mysql.com/">MySQL Forge</a>, a place where the MySQL community shares code snippets with one another</li>

<li><a href="http://jeremy.zawodny.com/mysql/mytop/">mytop</a>, the classic tool for monitoring MySQL queries and processes</li>
</ol>


