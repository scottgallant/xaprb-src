---
title: "Making Migrations Faster and Safer"
date: "2011-05-23"
categories:
  - Databases
  - Guest Posts
---

*This post originally appeared on [the Engine Yard blog](https://blog.engineyard.com/2011/making-migrations-faster-and-safer/).*

Are your migrations the execute-and-pray variety? If so, you are probably not (yet!) running a large application. Even small applications can benefit from a more careful migration process. It's important to establish the process now, before things get big, because it will be much more difficult later. In my study of emergency issues, the single most valuable preventive measure I identified was change control. Migrations involve change, and the more disciplined and careful you are, the less opportunity for problems, and the more safeguards you can build in to help recover quickly if a problem ever does occur.

The single best way to prevent bad changes from happening in production is to execute them in a non-production environment and observe the system. As you might know, ALTER TABLE is generally a blocking operation in MySQL. It can be very hard to predict how long it will take, and the growing sense of panic you'll feel as you watch your entire application pile up is no fun, especially because you don't know if it's about to complete or if you're only 30 seconds into a 3-hour ALTER.

A non-production (staging) environment with a recent copy of your production data is your friend. The part I see a lot of folks stumble over is getting a realistic copy of the data. If you run the migration against a toy dataset, you won't understand how long it's really going to take in production.

To get started, you can restore your latest backup onto the staging server. Use mysqldump or Percona XtraBackup to create a backup if you don't have one. If you're an Engine Yard customer, their clone feature which allows creating a staging environment from a production snapshot works for this as well.

When you run the migration, capture the output and review the timings carefully. Write a little script to help. Here's an example that I use sometimes for my clients. Save the output as migrated.txt, and run this Perl one-liner:

    perl -ne '/(\S+): migrated \((.*)s\)/ && print "$2 $1\n"' migrated.txt | sort -rn -k1,1

The output will be execution times and migration names, sorted longest-first. That makes it easy to see which operations might take a long time in production.

The next step is to review the SQL that your migration generates, looking for ALTER and CREATE INDEX statements you can combine. In case you aren't familiar with it, MySQL's ALTER statement generally works by creating a copy of the table in the background, modifying it, and then copying all the rows into it and swapping the tables. A CREATE INDEX statement is really an ALTER statement in MySQL. So if you ALTER a table, and then add an index with CREATE INDEX, you're making MySQL do all that work twice.

The problem is, Rails' migration methods often generate multiple alterations to a table behind the scenes. Here's an example:

	def self.up
		  add_column :comments, :name, :string
		  add_column :comments, :user_id, :integer, :null => false
		  add_index :comments, :user_id
	end

This code ends up running three separate ALTER statements: one for each added column, and one for the new index. In cases such as this, you might have to execute direct SQL instead. Here's another code snippet that does essentially the same thing:

	def self.up
		  execute "ALTER TABLE comments add name varchar(255), add user_id int NOT NULL, add index `index_comments_on_user_id` (`user_id`);"
	end

Sometimes you might not notice repeated ALTER statements in the Ruby code, so you should review the migration's generated SQL in staging. Look for any ALTER and CREATE INDEX statements that reference the same table, and merge them. This can save a lot of work for the database, and reduce the amount of time that the migration locks the table.

Do you have tips or suggestions of your own to add to mine? Post them in the comments, I look forward to your feedback!


