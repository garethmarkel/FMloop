USE freelance_ai;

/* Test data for person table */
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Eimile', 'Hradsky', 'ehradsky0@ustream.tv', 'Research Nurse', 'DQHasL', 3.0, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Courtney', 'Otham', 'cotham1@51.la', 'Web Developer III', 'hPc042l2r', 3.7, false);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Blaine', 'Risson', 'brisson2@squarespace.com', 'Safety Technician II', 'yM9bX1EseA', null, false);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Lucho', 'Holley', 'lholley3@mapquest.com', 'Payment Adjustment Coordinator', 'XEfhYDUQB', 1.8, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Bili', 'Jambrozek', 'bjambrozek4@amazon.com', 'Financial Analyst', '8skT1Y', 3.1, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Mellisent', 'Barratt', 'mbarratt5@edublogs.org', 'VP Marketing', '5ZhLYhxen', 2.4, false);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Webster', 'Buse', 'wbuse6@yelp.com', 'Marketing Manager', '3v4zgU', 2.8, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Helenelizabeth', 'De Miranda', 'hdemiranda7@elegantthemes.com', 'Quality Control Specialist', 'tOdlvm', 4.5, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Deidre', 'Eastabrook', 'deastabrook8@biglobe.ne.jp', 'Biostatistician IV', 'PyoJMzZVZQt', 1.4, true);
insert into person (first_name, last_name, email, title, passphrase, user_rating, freelancer) 
values ('Maje', 'Pincott', 'mpincott9@tripadvisor.com', 'VP Sales', 'wB9Wkp', 1.7, true);

/* Test data for project */
SET @owner_count = 0;
SET @owner_id = 1000;

DELIMITER //

CREATE FUNCTION AssignOwner()
RETURNS INT
NO SQL
NOT DETERMINISTIC
BEGIN
	IF @owner_count % 5 = 0 THEN
		SET @owner_id = @owner_id + 1;
    END IF;
    
    SET @owner_count = @owner_count + 1;
    
	RETURN @owner_id;
END; //

DELIMITER ;

insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Namfix', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 
	1.6, '2020-04-09 23:25:43', '2019-04-10 03:35:56', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Zontrax', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 
	1.8, '2020-05-22 10:08:51', '2019-01-15 16:47:55', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Mat Lam Tam', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 2.1, '2020-04-12 03:59:19', 
	'2019-02-03 21:18:57', '2019-09-21 08:12:34', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Rank', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 
	1.2, '2019-07-29 16:16:20', '2019-01-01 18:25:04', '2020-01-07 11:50:48', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Wrapsafe', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 10.85, '2019-06-30 13:42:01', '2019-04-01 17:54:08', 
	'2019-11-12 12:11:14', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Bitchip', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 
	1.7, '2019-12-13 11:47:51', '2019-04-08 05:29:35', '2020-02-03 20:12:05', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Span', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 8.05, 
	'2019-12-27 20:03:28', '2019-02-15 06:17:25', '2019-11-25 03:54:00', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Bamity', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 4.6, '2019-10-05 09:47:38', 
	'2019-04-29 22:39:10', '2020-01-23 01:24:37', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Ventosanzap', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1.3, 
	'2020-05-09 21:24:02', '2019-01-26 05:00:06', '2019-09-19 02:57:19', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Hatity', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 5.05, '2019-09-01 07:10:52', 
	'2019-04-28 11:13:19', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Matsoft', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 3.3, 
	'2020-03-05 02:33:10', '2019-01-27 01:36:56', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Mat Lam Tam', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 3.0, 
	'2019-12-12 10:13:13', '2019-02-22 17:18:51', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Andalax', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 3.4, '2020-03-06 19:06:21', 
	'2019-01-10 22:04:41', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Asoka', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 4.68, '2020-03-16 15:49:52', '2019-01-29 13:49:49', 
    null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Tampflex', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1.7, 
	'2019-11-17 12:05:59', '2019-01-09 00:57:47', '2019-05-29 12:26:13', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Tres-Zap', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1.8, '2019-08-31 02:48:08', '2019-01-16 19:52:52', 
    null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Tres-Zap', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 
	4.5, '2020-02-03 03:21:29', '2019-03-15 12:08:40', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Sonsing', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 4.1, 
	'2019-09-18 18:09:28', '2019-02-17 21:03:28', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Home Ing', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 6.99, 
	'2020-03-20 08:02:28', '2019-02-04 10:26:18', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Sonsing', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 15.25, '2020-05-20 01:48:56', '2019-04-05 01:06:19', 
	'2019-08-04 10:11:11', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Lotlux', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 2.9, 
	'2019-08-04 14:50:01', '2019-04-03 19:58:55', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Regrant', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 4.5, '2019-12-13 05:08:55', 
	'2019-01-21 03:24:12', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Span', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 3.6, 
	'2019-07-10 07:34:04', '2019-02-18 09:28:17', '2019-06-10 12:40:52', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Alpha', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 1.4, '2019-07-02 09:16:25', '2019-02-15 17:53:40', '2019-05-27 04:40:10', 
    true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Tin', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 8.69, 
	'2020-03-15 08:16:40', '2019-03-23 02:41:51', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Zoolab', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 10.12, '2019-09-22 11:56:30', 
	'2019-02-28 08:16:04', '2019-09-04 21:44:13', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Tresom', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 7.99, '2020-02-05 20:37:08', '2019-03-10 04:49:30', 
    null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Keylex', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 4.5, '2020-01-12 23:47:12', 
	'2019-01-17 08:17:03', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Asoka', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 2.5, '2019-06-20 05:50:30', 
	'2019-04-14 18:15:56', '2020-01-16 23:55:01', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Zathin', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 2.4, 
	'2020-05-06 05:57:43', '2019-03-14 08:49:58', '2020-03-14 11:02:30', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Y-find', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 4.4, '2019-11-02 17:13:46', 
	'2019-04-10 22:17:47', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Biodex', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 4.4, 
	'2020-05-22 01:45:46', '2019-03-24 22:49:57', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Home Ing', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 12.50, 
	'2020-05-09 01:13:42', '2019-02-22 07:25:17', '2019-09-05 03:55:42', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Bitwolf', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1.7, 
	'2019-12-26 22:45:17', '2019-02-25 20:02:57', '2020-03-15 12:21:13', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Bitchip', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 14.50, 
	'2019-07-16 02:59:58', '2019-03-29 06:28:17', '2020-02-08 00:20:21', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Stronghold', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 7.99, '2020-05-17 11:46:37', 
	'2019-04-12 07:14:42', '2020-03-09 14:05:58', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Keylex', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 4.0, 
	'2019-10-09 08:01:57', '2019-03-29 15:18:46', '2020-03-07 23:27:31', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Sonsing', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 
	2.1, '2019-06-10 21:12:39', '2019-03-27 13:08:17', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Y-Solowarm', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 2.7, '2019-12-06 06:06:29', 
	'2019-02-24 18:10:51', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Voltsillam', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 9.89, 
	'2020-01-13 10:41:03', '2019-04-20 16:29:47', '2020-01-17 19:33:01', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Bitwolf', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 
	2.5, '2020-05-09 16:20:25', '2019-02-11 12:20:29', null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Gembucket', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1.7, '2019-09-13 11:08:50', 
	'2019-04-06 04:44:10', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Quo Lux', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 3.4, '2019-08-04 10:24:01', '2019-02-05 16:55:33', 
	null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Job', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 4.1, '2019-07-28 04:30:15', 
	'2019-03-22 04:59:43', null, true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Fintone', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 
	12.30, '2019-09-27 11:20:34', '2019-01-19 17:27:48', '2019-09-21 01:08:50', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Mat Lam Tam', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1.1, '2019-10-30 03:07:29', 
	'2019-04-08 16:17:36', '2019-12-01 14:03:37', false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Lotlux', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1.6, 
	'2019-07-30 03:45:35', '2019-02-19 10:23:25', '2020-03-20 18:54:49', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Veribet', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1.2, '2019-09-14 12:07:31', '2019-04-04 05:46:33', 
	null, false, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Vagram', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 16.70, 
	'2020-03-17 00:16:32', '2019-04-06 21:38:26', '2019-10-28 19:00:54', true, AssignOwner());
insert into project (title, explanation, price, due_date, created, completion_date, contracted, owner_id) 
	values ('Sub-Ex', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 2.9, 
	'2019-08-16 00:16:38', '2019-03-04 12:46:45', null, false, AssignOwner());
