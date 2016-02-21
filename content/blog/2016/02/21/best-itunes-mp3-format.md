---
author: Baron Schwartz
categories:
- Music
- Reviews
date: 2016-02-21T11:12:56-05:00
description: "Compression formats such as MP3, AAC, and Ogg Vorbis have a lot of nuances."
image: media/2016/02/cymatics.jpg
title: "The Best Lossy Music Compression"
---

I noticed recently that Google Play Music has a set of features I wasn't aware
of before, and decided to give it a try. Through various kinds of [yak
shaving](http://projects.csail.mit.edu/gsb/old-archive/gsb-archive/gsb2000-02-11.html),
I ended up tackling a project I'd wanted to look into for a while: **which
formats and settings are really the best for lossy music compression?**

What I learned was both fun and surprising, and ultimately highly practical. If
you're in a hurry, the summary is that high-quality variable-bitrate MP3
produced with the LAME encoder is probably the best all-around choice if you
want broad compatibility.

But before I get to that, let's sharpen some yak razors, shall we?

![Cymatics](/media/2016/02/cymatics.jpg)

<!--more-->

I have a large library of CDs. Although I listen to more music on Spotify now
than on CD, many of my CDs are esoteric stuff that is not available on Spotify.
For years I've tried keeping it in various music libraries and players so I can
listen on-the-go. It was never a satisfactory solution. More recently I've been
an Apple user, and gradually migrated all of my music into iTunes.
Unfortunately, my collection is too large to sync to any mobile device or work
laptop, so unless I'm at home, I can't listen to my music.

### Reevaluating Google Play Music

I've been aware of several services that let you upload your music library to
the "cloud," but was never happy with any of them. It always seemed that I could
get most of what I wanted, but the lacking features were deal-killers in some
way, so the situation remained: Spotify on the go, my personal library at home.
As far as I could see, the choices looked kind of like this:

- Spotify: great for subscription-based streaming, cluttered UI, doesn't have
  all my music, doesn't support uploading my personal music.
- Apple services and devices: doesn't fit all my music, too expensive, Music
  Match doesn't seem to actually *match* anything, no subscription-based streaming
  of stuff I haven't purchased (although that's changed recently). It's been a
  while; maybe I should take another look at this too.
- Amazon Cloud Player: doesn't have a good library of stuff to stream, clunky
  UI, uploading features don't work well (matching of songs doesn't work).
- Pandora, et al: niche.
- Google Play Music: wasn't really in my sphere of consciousness.

It all started with Neil Young. I just got nostalgic for his album *Silver and
Gold* one day, and I couldn't find it on Spotify. I am an Amazon Prime member, so
I thought to look there, but it wasn't available. I own it on CD and didn't want
to buy it again. While looking around to see where I could get it (I wasn't near
my home), I stumbled upon Google Play Music again.

Google Play Music turns out to have a surprisingly nice UI on both the web and
mobile apps, a good library of music for streaming via subscription, and
supports uploading 50,000 songs on the free plan (enough for me). It also
supports offline listening via downloading, and permits exporting files that you
uploaded. Could it be the perfect service?

Because I'm already a longtime Spotify customer, I didn't want to switch away
fully to another service like Google Play Music, but I thought perhaps it'd be
worth trying it out for uploads only, since that adds $0 to my current monthly
cost.

So I installed the Google Music Manager, let it upload my library, and went on a
trip.  While away, I cued up *Silver and Gold*. "Good to see you, good to see you
again," it started, and I smiled. Good to see you again too, Neil.

But then my smile faded. the sound quality was awful! I was so bummed. You might
already know that I'm [kind of picky about the sound quality of my
music](/blog/2014/01/16/bose-sennheiser-sony-noise-cancelling-headphones/). I've
taken some care in importing my music into iTunes, and although occasionally I
can hear that a song's quality isn't quite as good as I'd like, this was another
matter altogether. It was really painful.

### Lossy Compression

Someday I'd like to [learn about lossy compression in detail by reading
Karlheinz Brandenburg's paper *MP3 and AAC explained* more
carefully](https://graphics.ethz.ch/teaching/mmcom12/slides/mp3_and_aac_brandenburg.pdf),
but my current understanding of it is that compression schemes such as MP3, Ogg
Vorbis, and AAC discard portions of the sonic information that the human ear is
less able to hear, in turn introducing errors that are designed to be hard to
hear. These are based on "psychoacoustic models," which I interpret in my
layman's terms as factors such as the following:

1. When the music is loud, it's harder to hear quiet sounds.
2. When the music is complicated, we tend to focus on the big themes, not the
	details, and we don't hear well at the high and low frequency limits.
3. We don't hear high and low frequencies well when they're quiet.
4. Compression artifacts can be masked by the music itself (and thus inaudible)
	if they're quiet enough.

I know there are a variety of compression artifacts. For some reason, the one my
ear picks up the most is what I call a "swishy" sound, which I hear in high
frequencies such as sibilant vowels, cymbals, and the like. When these sounds
change in amplitude, their frequency spectrum seems to change unnaturally if the
compression is too lossy, and I cringe. I may be misinterpreting what's
happening here, but that's how it sounds to my ears: loud cymbals sound bright,
but as they die out, they become muddy.

I've also noticed that some songs tend to be hard edge-cases for lossy
compression. For example, David Gray's song *Fugitive* requires very high
quality settings to sound good to my ears. It sounds awful at compression
settings that make other songs sound pretty good to me.

All lossy compression works by throwing away information, so it's not surprising
that these effects show up every so often. I accept that as part of the deal.
But when it's as bad as my Neil Young album sounded, it's unbearable for me.

I would have noticed if my original import into iTunes had sounded
this bad. What happened? I speculated that Google Play Music had
transcoded the already-compressed file into another format, adding generation
loss.  I found a [help page on Google Play Music's file format
support](https://support.google.com/googleplay/answer/1100462) that gave me a
clue: any non-MP3 file is converted to an MP3 file at the same bit rate. Indeed,
the song I was listening to downloaded (exported) as a 128k MP3 file, which is
not very high quality, especially if it has been reencoded.

It seems straightforward to me that the only way to avoid this problem is to
upload MP3 files to Google Play Music in the first place. I haven't looked at my
iTunes library, but I'm sure it is a variety of formats, including lots of AAC
files (the iTunes default). I ripped those CDs
over many years with many different programs. I'm not eager to throw it away and
do it again.

### Comparing Lossy Compression Formats

This piqued my curiosity, though: how good are the compression formats, anyway?
I have been interested in lossy compression for many years. I remember being
fascinated when MP3 first appeared on the scene, and learning about alternative
formats such as VQF (TwinVQ), Real Audio.  I remember when WMA arrived, and then
Ogg Vorbis, and the newest contender, [Opus](https://www.opus-codec.org/).  The
claimed benefit is usually better sound quality at lower bit rates (smaller file
sizes). My unqualified, untested assumptions were that:

1. MP3 wasn't very good relative to its successors, but improved over time.
2. Vendor-specific formats such as WMA were not much better.
3. Ogg Vorbis was very good, but would never be widely accepted as a standard.
4. AAC I wasn't sure about. I thought it was a proprietary Apple format; I
	was wrong.

While browsing around a bit, an additional nuance caught my attention: the major
MP3 encoding software is the free/opensource LAME and the proprietary, patented
Fraunhofer encoding software. Apparently iTunes uses Fraunhofer software, not
LAME, and it seems that lots of people believe LAME produces better sounding MP3
files than Fraunhofer.

At this point I had a thought: leaving aside my subjective opinions of audio
quality, it shouldn't be hard to get a firm answer on how well various formats
perform. Just encode, then decode and subtract from the original signal, and
look at the resulting errors. Right?

*I need to caveat what follows. It is not that simple. To do that misses
the point of perceptual audio coding to a large extent.  However, it is still
fun and interesting to do.*

I encoded the first 30 seconds of *Fugitive* in a variety of formats and
settings. Then I inverted the original signal, and added the original and
decoded signals together. (It's necessary to ensure that the two signals are
exactly aligned in time, or this won't work). This is easy to accomplish in
Audacity. The result is the encoding *error*, or roughly the combination of the
signal that's discarded plus signals that the encoder adds (quantization noise
and the like). In a way, it's like the audio version of looking at a
photographic negative overlaid with a positive, seeing what "leaks" through.

Listening to the error signal is interesting. With high quality compression, it
essentially sounds like some high-frequency static, in which you can recognize
the original song's rhythm. At lower quality, it sounds like a muffled version
of the song, with the midrange elided. You can also hear many of the compression
artifacts quite easily, such as dropouts in frequency bands. Two of the most
dramatic examples are the error signals from these compression settings:

- iTunes using MP3 with custom settings: highest quality, VBR, 96k minimum.<br>
    <audio controls>
    <source src="/media/2016/02/itunes-highest-vbr.mp3" type="audio/mpeg">
	 Your browser does not support the audio element.
	 </audio>
- LAME using 320k constant bit rate.<br>
    <audio controls>
    <source src="/media/2016/02/lame-320.mp3" type="audio/mpeg">
	 Your browser does not support the audio element.
	 </audio>

I combined the channels into mono and amplified the signals by 10dB to make
their waveforms clearer, and took a screenshot of the result. In order, these
are iTunes AAC defaults, iTunes MP3 at fixed 320k bitrate, iTunes default MP3
settings, iTunes MP3 at highest quality preset, iTunes MP3 at highest quality
with VBR at 96k minimum bitrate, LAME at 320k bitrate, LAME at VBR 0 (highest
quality) setting, Ogg Vorbis at Audacity's highest quality setting (10 out of
10), and Ogg Vorbis at Audacity's default quality setting of
5 out of 10.

![Waveforms](/media/2016/02/waveforms.png)

The more information in the error, the more of the original music is missing or
distorted by added non-music signals. However, it is *not* true that this means
the music will sound better. As I said before, the point of perceptual audio
coding as a compression technique is to throw away as much information as
possible, thus *adding as much error as possible*, while trying to keep it below
the threshold at which a human can perceive it. If successful, ideally this
actually creates a large error signal but the music still sounds good.
Poor-quality encoders might produce a small error signal but make the music
sound bad. So there isn't a direct relationship between the error signal and the
quality of the music.

Another interesting way to look at the error signal is as a spectrogram:

![Spectrograms](/media/2016/02/spectrogram.png)

Here it's quite clear that all of the iTunes MP3s are missing a lot of bass.
Contrast the LAME 320 error spectrum to the AAC spectrum, and you can see that
AAC retains a lot more high-frequency data too.

### What's The Best Lossy Compression?

You can probably guess that I'm going to say this, but it depends.  AAC and Ogg
Vorbis are clearly more advanced than the older MP3 standard, and are capable of
producing better sounding audio at lower bitrates. However, that's not the only
thing you might care about:

- Compatibility. I don't know why Google Play Music doesn't support AAC
  natively, but it doesn't. Re-encoding a file from AAC into "equivalent
  bitrate" MP3 files is a terrible idea; the resulting music sounds awful.
  Likewise, I'd be pretty happy if everyone supported Ogg Vorbis, but that's
  never going to happen. (Tangent: I've heard that Spotify uses Ogg Vorbis.)
- The sweet spot. Although a lot of people seem to believe that 320k MP3 files
  are the pinnacle, in reality there's a nonlinear bitrate-versus-quality curve
  for both MP3 and AAC compression (and probably others as well.) There's a
  point of diminishing returns, after which higher bitrates just make the files
  a lot larger without adding much in perceived sound quality. The paper I
  linked to earlier has more information on this, and notes that for MP3 the
  sweet spot is about 128kbit/s, whereas AAC's sweet spot is a bit lower bitrate
  but it doesn't hit as much of a quality ceiling.
- File size. This is the whole point, isn't it? Constant bitrate files at 320k
  aren't very compressed in terms of file size.

On the topic of file sizes, a 40MB song in WAV format compressed about 4x with
320k MP3, about 5x with the default iTunes AAC format, and a bit more than that
with LAME's V0 setting.

A lot of audiophiles use lossless compression (which doesn't reduce file size
much), and produce high-quality MP3 or AAC files from them.  For my purposes,
I'd like to have

- Only one compressed copy of my files (I still have the CDs, after all).
- Good quality sound even if it's not perfect.
- Minimal file size.
- Music available everywhere without horrendous reencoding and other problems.

To achieve this, it seems that if I want to use services such as Google Play
Music, my best option is to encode to MP3 with the LAME encoder and a
high-quality variable bitrate such as v0 or v1. (Constant bitrates bloat files
needlessly; lossy compression is designed to achieve a desired perceived
quality, which doesn't always require a lot of bits). However, I have no desire
to reencode tens of thousands of songs in this way.

The other option I think I need to consider is using Apple's music service instead of
Google's. It supports both AAC and MP3 files as I'd expect, and now seems to be
a pretty direct competitor to Spotify and Google's offering. Last time I gave it
a trial, though, the music matching feature didn't match anything, so it was
potentially going to upload *all* of my music, which would have exceeded the
limits they had at that point and would have cost me a pretty fair amount of
money.

If I used Apple's services instead, then my choice would be AAC files, not MP3.
Although MP3 is more broadly compatible, AAC produces clearly better quality
audio in my opinion, without the penalty of larger file sizes.

In closing, I'll leave you with the opening lyrics of *Fugitive*:

> *Is the answer none of the above...*

Image credits: [Cymatics](https://www.flickr.com/photos/evangrant/8197459006/)
