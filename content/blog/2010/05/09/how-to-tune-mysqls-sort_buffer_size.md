---
title: "How to tune MySQL's sort_buffer_size"
date: "2010-05-09"
url: /blog/2010/05/09/how-to-tune-mysqls-sort_buffer_size/
categories:
  - Databases
---
I continually see consulting engagements like the following:

> My server load is high and my queries are slow and my server crashes. Can you help me tune my server? Here is the my.cnf:
> 
> `[mysqld]`<br>
> `sort_buffer_size = 100M`

Such a large `sort_buffer_size` is a serious problem, but unfortunately there
is a lot of cargo cult advice on the Internet, in books, and in "tuning scripts,"
that perpetuates the harmful advice to increase it.

The usual advice is to increase the sort buffer size when `sort_merge_passes`
is high. This advice is much like the ratio-based methods for [how to optimize
the key cache hit
ratio](http://www.mysqlperformanceblog.com/2010/02/28/why-you-should-ignore-mysqls-key-cache-hit-ratio/).
It's wrong and harmful.

In general, I have found the following to be true:

* Non-experts should leave this setting at its default, and comment it out of the configuration file.
* Experts don't need me to tell them what to do, but most of them will leave this setting at its default, and comment it out of the configuration file.

**So if you're reading this post because you're trying to learn how to tune this
variable, in all seriousness, the answer is you should not do it.**

If you're looking for guidance about how to get a good baseline configuration
for MySQL, tuning it for performance, I have two suggestions.

1. Realize that configuration generally doesn't improve performance; it is more
	often the case that bad configuration harms it. So it's more a matter of
	avoiding harm, than creating performance improvements. For more, read
	[Configuring MySQL for
	Performance](https://www.vividcortex.com/resources/configuring-mysql-for-performance/).
2. Focus on *query performance* and not on *server configuration*. There are
	much greater gains to be achieved that way.

The most amazing thing about `sort_buffer_size` is how many people utterly
ruin their server performance and stability with it, but *insist* that they know
it's vital to change it instead of leaving at its default. I do not know why
this is always the case. Why don't people choose *random* variables to destroy
their performance? It's not as though there is a shortage to choose from. Why
does everyone always pick `sort_buffer_size` instead of something else?

<small>*PS: I considered a simpler tuning guide, such as [Domas's guide to
tuning the query cache](http://mituzas.lt/2009/07/08/query-cache-tuning/), but I
am convinced that people need more a complex guide for the `sort_buffer_size`, or
they will not believe in the validity of the instructions. I base this on
multiple experiences being paid a lot of money to suggest not setting
`sort_buffer_size` to 256M, and being told that I must be an idiot.*</small>
