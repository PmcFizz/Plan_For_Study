create table customer
	(First_Name char(50),
		Last_Name char(50),
		Address char(50),
		City char(50),
		Country char(50),
		Brith_Date date);

insert into customer (First_Name,Last_name,Address,City,Country,Birth_Date) values 
	("第一个名字","最后一个名字","这是他的地址","这是他的城市","这是他的街道","");

insert into customer (First_Name ,Last_name,Address, City,Country, Brith_Date) values
	("第一","最后","地址","城市","街道","");

update customer set First_Name="这到底是低第几" where First_Name ="第一";

alter table customer add Gender char(1);

alter table customer change Address Addr char(50);

alter table customer modify Addr char(30);

alter table customer drop Gender;

drop table customer;

truncate table customer;

delete from customer where First_Name ="第一";
