---
title: PostgreSQL Conference East 2009, Day Two
date: "2009-04-04"
url: /blog/2009/04/04/postgresql-conference-east-2009-day-two/
categories:
  - Conferences
  - Databases
---
I missed Friday and part of Saturday, but I was at [PostgreSQL Conference East 2009](http://www.postgresqlconference.org/2009/east/) for part of Saturday (and will be for part of Sunday too.) A brief recap of the talks I attended:

*   PostgreSQL Backup and Recovery -- by [Kevin Kempter of Consistent State](http://www.consistentstate.com/). I arrived halfway through, and heard about PITR, Slony, and a few other topics.
*   Playing with Playr -- by [Jonah Harris of myYearbook](http://www.myyearbook.com/). [Playr](https://area51.myyearbook.com/) is a tool that analyzes log files, and lets you replay them exactly (same timing, same commit order, same concurrency, etc). They use it to capture production traffic and replay it against a non-production machine to evaluate new hardware and see how it does on their workload. (We have built something similar at Percona, for MySQL.) There are some other tools too -- Staplr, Primr. Interesting to hear how they're doing it, and get a different take on what has to be done to get it right; for example, setting the system clock to the date and time the production workload was measured.
*   Monitoring Postgres with check_postgres.pl -- by [Greg Sabino Mullane of End Point](http://www.endpoint.com/). A Nagios check, and yet it's so much more. Some good thoughts arose in my mind as I listened. For example, they are using a 'busybox' approach to make one script that you can invoke under many names and get different behaviors; I wonder if we can do that with Maatkit? There would be some tough things to think about with that approach. Also, the benefit of making a big empty file on the filesystem, so that if the system runs completely out of disk space you can delete the empty file and have enough free space to do some recovery work.
*   Reconciling and comparing databases using schemas, DBI-Link and Slony -- by [Norman Yamada of the Millburn Corporation](http://www.millburncorp.com/). Interesting talk about the ever-relevant topic of building dev/stage/test datasets, testing against live data (but not on a production database), and nifty Postgres features (one of which was almost misconstrued as a bug) that make it possible. Lots of details about Slony, DBI-Link, etc, and a lively discussion or three.
*   Configuring a Warm Standby, the Easy Way -- by [Joshua Drake of Command Prompt](http://www.commandprompt.com/). A talk about [Pitrtools](https://projects.commandprompt.com/public/pitrtools/), a project Joshua created to make PITR standbys much friendlier to set up and administer.

I had lunch and supper with various people (new faces to go with names, hooray!), and a lot of nice conversation about topics like databases and consulting. And of course, it's nice to see people again after a year, although some of them did make it to [OpenSQL Camp](http://www.opensqlcamp.org/) 2008 so it hasn't been that long!

It seems the PostgreSQL consultants are seeing an uptick in demand just as we are at Percona, though one of them thought it was due to what MySQL was doing -- until I told him everyone's demand was up across the board. I think it's mostly a sign of the economic times, though I'm no prophet.


