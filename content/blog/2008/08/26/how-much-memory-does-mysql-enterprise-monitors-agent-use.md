---
title: "How much memory does MySQL Enterprise Monitor's agent use?"
date: "2008-08-26"
url: /blog/2008/08/26/how-much-memory-does-mysql-enterprise-monitors-agent-use/
categories:
  - Monitoring
  - Databases
  - Open Source
---
After last week's post on [agents versus agentless monitoring systems](/blog/2008/08/21/is-agent-based-or-agentless-monitoring-best/), I got a lot of email. One, from a customer whose name I am not permitted to mention, sent me the following action shot (posted with permission):

> Note: [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.


![MySQL Enterprise Monitor Memory Usage](/media/2008/08/mysql-enterprise-monitor.jpg)

<!--more-->

Over half a gigabyte; more than twice what MySQL itself is using. So, that raises an interesting question. How much memory would you say your server's [MySQL Enterprise Monitor](http://www.mysql.com/) agent uses? No bashing allowed, tell the truth. And please post if your agent runs in a small amount of memory, too.

Another thing I'm interested in: what factors contribute to the high memory usage? Under what conditions does it use a lot or a little? What can you expect, generally speaking?

On another note, I think it's almost unfair not to mention the competition, so I will: I was playing with [MONyog](http://www.webyog.com/) 2.6 recently and it started to use a lot of CPU. I think it might be architecture-specific (amd64 Ubuntu) but I can't be sure. It was using 170% CPU on my dual-core system to monitor 2 instances.


