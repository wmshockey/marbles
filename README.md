# README

This game of Marbles is essentially a web browser game with most of the process logic performed in the javascript file marbles.js.   Ruby on Rails is used primarily as the backend to save the game records.

Ruby version is 2.6.1p33
Rails version is 5.2.4.2
MySQL version is 15.1 Distrib 5.5.56-MariaDB

The Ruby on Rails and MySQL backend runs on an Linux CentOS server version 7.

Pulling the entire repository from GIT will contain everything needed to install the application except for one file.  There is a local_env.yml file in the config directory tha contains the various passwords needed to access the database and to send out the necessary email notifications through an account using GMAIL.

The devise gem is used to manage user authentication.

The database can be created using the the rails rake db:migrate function.

A test suite is not currently developed yet for the application.

There are no job queues, cache servers, search engines or any other services used other than Ruby on Rails, MySQL and Javascript.

Within the Javascript code, there are a couple of places where Ajax is used to communicate with the server.

Please respect the terms of the LICENSE agreement.

If any questions about how to deploy the application, you can conatact me at wmshockey@gmail.com
