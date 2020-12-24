# README

This game of Marbles is essentially a web browser game with most of the process logic performed in the javascript file marbles.js.   Ruby on Rails is used primarily as the backend to save the game records.  This is a standard Rails application.

Ruby version is 2.6.1p33
Rails version is 5.2.4.2
MySQL version is 15.1 Distrib 5.5.56-MariaDB

The Ruby on Rails and MySQL backend runs on an Linux CentOS server version 7.

Cloning the entire repository from GIT will contain everything needed to install the application except for one file.  The environment variables that need to be set up are:

For the MySQL database access:
MARBLES_DB_USERNAME
MARBLES_DB_PASSWORD
For the GMAIL email account to handle user account notifications:
GMAIL_USERNAME
GMAIL_PASSWORD

The devise gem is used to manage user authentication.

The database can be created using the the rails rake db:migrate function.

A test suite is not currently developed yet for the application.

There are no job queues, cache servers, search engines or any other services used other than Ruby on Rails, MySQL and Javascript.

Within the Javascript code, there are a couple of places where Ajax is used to communicate with the server.

Please respect the terms of the LICENSE agreement.

My current implementation of the game is open for public use at www.marblemind.ca provided you register with a verifiable email address.

If any questions about how to deploy the application, you can conatact me at wmshockey@gmail.com
