---
title: "5 subtle ways you're using MySQL as a queue, and why it'll bite you"
date: "2011-09-15"
categories:
  - Databases
  - Guest Posts
tags:
  - PostgreSQL
---

*This post originally appeared on [the Engine Yard blog](https://blog.engineyard.com/2011/5-subtle-ways-youre-using-mysql-as-a-queue-and-why-itll-bite-you/).*

I work for Percona, a MySQL consulting company. To augment my memory, I keep a quick-reference text file with notes on interesting issues that customers ask us to solve. One of the categories of frequent problems is attempts to build a job queue in MySQL. I have so many URLs under this bullet point that I stopped keeping track anymore. Customers have endless problems with job queues in their databases. By "job queue" I simply mean some list of things they've inserted, which usually need to be processed and marked as completed. I've seen scores -- maybe hundreds -- of cases like this.

Many people realize the difficulties in building a good job queue or batch processing system, and try not to create one inside MySQL. Although the job queue is a great design pattern from the developer's point of view, they know it's often hard to implement well in a relational database. However, experience shows me that job queues sneak up in unexpected ways, even if you're a seasoned developer.

Here are some of the most common ways I've seen the job-queue design pattern creep into an application's database. Are you using MySQL for any of the following?

1.   **Storing a list of messages to send:** whether it's emails, SMS messages, or friend requests, if you're storing a list of messages in a table and then looking through the list for messages that need to be sent, you've created a job queue.
1.   **Moderation, token claims, or approval:** do you have a list of pending articles, comments, posts, email validations, or users? If so, you have a job queue.
1.   **Order processing:** If your order-processing system looks for newly submitted orders, processes them, and updates their status, it's a job queue.
1.   **Updating a remote service:** does your ad-management software compute bid changes for ads, and then store them for some other process to communicate with the advertising service? That's a job queue.
1.   **Incremental refresh or synchronization:** if you store a list of items that has changed and needs some background processing, such as files to sync for your new file-sharing service, well, by now you know what that is.

As you can see, queues are sly; they slip into your design without you realizing it. Frankly, many of them aren't really a problem in reality. But the potential is always there, and I've observed that it's hard to predict which things will become problems. This is usually because it depends on behavior that you don't know in advance, such as which parts of your application will get the most load, or what your users will promote to their friends.

Let's dive a little bit into why job queues can cause trouble, and then I'll show you some ways to help reduce the chance it'll happen to you. The problem is usually very simple: performance. As time passes, the job queue table starts to either perform poorly, or cause other things to perform badly through collateral damage. There are three primary reasons for this:

1.   **Polling**. Many of the job queue systems I see have one or more worker processes checking for something to do. This starts to become a problem pretty quickly in a heavily loaded application, for reasons I'm about to explain.
1.   **Locking**. The specific implementation of the polling often looks like this: run a SELECT FOR UPDATE to see if there are items to process; if so, UPDATE them in some way to mark them as in-process; then process them and mark them as complete. There are variations on this, not necessarily involving SELECT FOR UPDATE, but often something with similar effects. The problem with SELECT FOR UPDATE is that it usually creates a single synchronization point for all of the worker processes, and you see a lot of processes waiting for the locks to be released with COMMIT. Bad implementations of this (not committing until the workers have processed the items, for example) are really horrible, but even "good" implementations can cause serious pile-ups.
1.   **Data growth**. I can't tell you how many times I've seen email list management applications that have a single huge emails table. New emails go into the table with a "new" status, and then they get updated to mark them as sent. As time passes, these email tables can grow into millions or even billions of rows. Even though there might only be hundreds to thousands of new messages to send, that big bloated table makes all the queries really, really slow. If you combine this with polling and/or locking and lots of load on the server, you have a recipe for epic disaster.

The solutions to these problems are actually rather simple: 1) avoid polling; 2) avoid locking; and 3) avoid storing your queue in the same table as other data. Implementing these solutions can take a bit of creativity, however.

First, let's look at how to avoid polling. I wish that MySQL had listen/notify functionality, the way that PostgreSQL and Microsoft SQL Server do (just to mention two). Alas, MySQL doesn't, but you can simulate it. Here are three ideas: use GET_LOCK() and RELEASE_LOCK(), or write a plugin to communicate through Spread, or make the consumers run a SLEEP(100000) query, and then kill these queries to "signal" to the worker that there's something to do. These can work quite well, although it'd be nice to have a more straightforward solution.

Locking is actually quite easy to avoid. Instead of SELECT FOR UPDATE followed by UPDATE, just UPDATE with a LIMIT, and then see if any rows were affected. The client protocol tells you that; there's no need for another query to the database to check. Make sure autocommit is enabled for this UPDATE, so that you don't hold the resultant locks open for longer than the duration of the statement. If you don't have autocommit enabled, the application must follow up with a COMMIT to release any locks, and that is really no different from SELECT FOR UPDATE. (The rest of the work can be done with autocommit disabled; you need to enable it for only this statement.) While I'm wishing for things, I wish that SELECT FOR UPDATE had never been invented. I haven't seen a case yet where it can't be done a better way, nor have I seen a case where it has failed to cause problems

Finally, it's also really easy to avoid the one-big-table syndrome. Just create a separate table for new emails, and when you're done processing them, INSERT them into long-term storage and then DELETE them from the queue table. The table of new emails will typically stay very small and operations on it will be fast. And if you do the INSERT before the DELETE, and use INSERT IGNORE or REPLACE, you don't even need to worry about using a transaction across the two tables, in case your app crashes between. That further reduces locking and other overhead. If you fail to execute the DELETE, you can just have a regular cleanup task retry and purge the orphaned row. (Hmm, sounds like another job queue, no?) You can do much the same thing for any type of queue. For example, articles or comments that are pending approval can go into a separate table. This is really required on a large scale, although you shouldn't worry that your Wordpress blog doesn't do things this way (unless you've been hired to rewrite CNN.com using Wordpress as a backend).

Finally, and I've saved perhaps the most obvious solution for last, don't use the database at all! Use a real queueing system, such as Resque, ActiveMQ, RabbitMQ, or Gearman. Be careful, however, that you don't enable persistence to a database and choose to use MySQL for that. Depending on the queue system, that can just reintroduce the problem in a generic way that's even less optimal. Some queue systems use all of the database worst practices I enumerated above.

I hope this article has given you some insight into the variety of ways that job queues inside of MySQL can sneak up on you and bite you in the tendermost parts. And I hope you can learn to recognize and avoid this design pattern yourself, or at least implement it in a way that won't hurt you. It really is such a common problem that it's become one of the classic questions I see. Now, I'm off to check my list of pending consulting requests and see what I should work on next.


