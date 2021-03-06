---
title: The difference between concurrency and parallelism
date: "2013-04-29"
url: /blog/2013/04/29/the-difference-between-concurrency-and-parallelism/
categories:
  - Programming
---
This confuses lots of people, including most recently Todd Hoff of HighScalability fame, who wrote in last week's [summary](http://highscalability.com/blog/2013/4/26/stuff-the-internet-says-on-scalability-for-april-26-2013.html) post,

> Have to say, this distinction has never made sense to me: [Concurrency is not parallelism](http://blog.golang.org/2013/01/concurrency-is-not-parallelism.html): concurrency is the composition of independently executing processes, while parallelism is the simultaneous execution of (possibly related) computations. Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once.
I think the problem is that words are hard to understand. The Go blog post is confusing because of that. Pictures are easier. Look, a single-threaded, non-parallel, **concurrent** process:

[<img src="/media/2013/04/Screen-Shot-2013-04-29-at-9.26.56-AM.png" width="715" height="251" class="aligncenter size-full wp-image-3155" />](/media/2013/04/Screen-Shot-2013-04-29-at-9.26.56-AM.png)

Lots of tasks can run on the system, but *only one of them makes progress at a time*. And here's one that's both concurrent and **parallel**:

[<img src="/media/2013/04/Screen-Shot-2013-04-29-at-9.28.05-AM.png" width="716" height="243" class="aligncenter size-full wp-image-3156" />](/media/2013/04/Screen-Shot-2013-04-29-at-9.28.05-AM.png)

Hopefully that clears things up.


