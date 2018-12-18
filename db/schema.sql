
create database closet_db;

use closet_db;

-- products
create table products (
id int(5) not null ,
name varchar(40) not Null,
price int(10) not Null,
img varchar(60) Null,
designer varchar(20) Null,
category varchar(20) Null,
primary key(id)
);

-- orders
create table orders (
userid varchar (20) not null,
products varchar(100) null, 
quantity varchar(100) null,
primary key (userid)
);

-- testimonials
create table testimonials (
id int(5) not null auto_increment,
review varchar(200) not null,
author varchar(20) not null, 
city varchar(20) not null,
primary key(id)
);