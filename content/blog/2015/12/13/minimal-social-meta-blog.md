---
author: Baron Schwartz
categories:
- Web
date: 2015-12-13T09:14:27-05:00
description: "Keep your site light and fast for social sharing with these minimal meta properties."
image: ""
title: Minimal Social Meta Tags for a Blog
---

When someone shares your blog article on a social network, odds are it will
appear with some descriptive text, images, and so on. If your blog lacks
explicit instructions, in many cases these properties are just guessed-at and
won't be great.

I've seen a lot of blog authors and template creators go too far the other
direction and add tons of redundant meta tags, which will make the page larger,
heavier, and slower.

What's the minimal necessary set of tags?

![Sharing](/media/2015/12/sharing.jpg)

<!--more-->

Most social media networks recognize various types of meta properties.
Unfortunately, there's a lot of redundancy amongst them. Fortunately, most of
them also fall back to an open standard called the [Open Graph
protocol](http://ogp.me/), so you can factor out the repetition.

For most blogs, and for the most popular social media for sharing informative
articles (Twitter, Facebook, Google+, and LinkedIn), you need the following
properties:

    <meta name="og:type" content="article" />
    <meta name="og:title" content="{content title, without site title}" />
    <meta name="og:url" content="{permalink}" />
    <meta name="og:image" content="{featured image}" />
    <meta name="og:description" content="{description < 200 chars}" />
    <meta name="og:site_name" content="{site title}" />

Some of these might seem redundant, but for example the URL is required for some
services. In addition, for Twitter you'll need the following:

    <meta name="twitter:card" content="{desired card type}" />
    <meta name="twitter:site" content="{your @username}" />

With those eight meta tags you're all set for most content-related sharing.
Other social media services, such as Pinterest, have additional tags they
require, and sometimes processes you need to follow to be whitelisted.

All of the social media services have a) documentation and b) validators to
preview how things will appear. Here are documentation links:

* [https://dev.twitter.com/cards/markup](https://dev.twitter.com/cards/markup)
* [https://developers.facebook.com/docs/sharing/webmasters](https://developers.facebook.com/docs/sharing/webmasters)
* [https://help.linkedin.com/app/answers/detail/a_id/46687/~/making-your-website-shareable-on-linkedin](https://help.linkedin.com/app/answers/detail/a_id/46687/~/making-your-website-shareable-on-linkedin)
* [https://developers.google.com/+/web/snippet/](https://developers.google.com/+/web/snippet/)

In many cases your content sharing instructions won't be honored until you use
the validator to check it. Checking triggers re-scraping and serves as a
whitelisting process for several of the networks.

[Image by Toban B on
Flickr](https://www.flickr.com/photos/tobanblack/3773116901/).
