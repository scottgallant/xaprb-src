---
title: "3 Common Rails + MySQL Mistakes"
date: "2011-02-14"
categories:
  - Databases
  - Guest Posts
---

*This post originally appeared on [the Engine Yard blog](https://blog.engineyard.com/2011/3-common-rails-mysql-mistakes).*

Rails makes database interaction so simple that it's easy to forget that the database isn't always happy with what Rails does to it. Here are three leading mistakes that hurt many Rails applications:

### 1. Using IN() subqueries

MySQL supports a few different types of subqueries. Unfortunately, one of them is a performance disaster. Even more unfortunately, that particular type is the most natural and intuitive way to write a few common query patterns. We're referring to IN() and NOT IN() subqueries. Note that IN(list,of,values) is just fine -- the problem is IN(SELECT...) queries, and its evil twin the NOT IN(SELECT...) subquery. These should be written as JOIN and LEFT OUTER JOIN, respectively, to avoid serious performance problems when the tables grow.

### 2. Using SELECT FOR UPDATE

Another common problem is locking some rows to "claim" them so nobody else works on the same rows. A common pattern where this is used is a queue. Anything that has a list of work to do, and tries to reserve some rows by doing a SELECT FOR UPDATE, ends up introducing a serialization point that forces all work to happen in single file, instead of letting lots of work happen concurrently. The solution is to use a unique identifier per consuming process, and go ahead and UPDATE non-claimed rows to have the process's identifier as a claim token. The UPDATE will return a number of rows modified, and if that is greater than zero, you've claimed some rows and can then SELECT them and process them. Be sure to either run in auto-commit mode or commit immediately after the UPDATE, so you don't end up holding locks on the updated rows and causing the same problem!

### 3. Using MySQL to store session data

It's so easy to use MySQL to store session data, but unfortunately it often ends up being one of the most expensive things the application does in the database. We've seen many cases where the session table accounts for the majority of the work in the database. With all that session-handling, the database can become unresponsive for the truly important work it should be doing (e.g. whatever makes money for your application). If you're using the database for sessions, consider Memcached instead. It's blazing fast because it doesn't worry about persisting your data transactionally.


