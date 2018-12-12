
create database closet_db;

use closet_db;


create table products (
id int(5) not null ,
name varchar(40) not Null,
price int(10) not Null,
img varchar(60) Null,
designer varchar(20) Null,
category varchar(20) Null,
primary key(id)
);

create table orders (
user_id int (5) not null,
products varchar(100) null, 
quantity varchar(100) null,
primary key (user_id)
);


create table testimonials (
id int(5) not null ,
text varchar(100) not null,
author varchar(20) not null, 
primary key(id)
);