use bookrentapp;
CREATE TABLE `book` (
  `id` char(10) NOT NULL,
  `Title` varchar(40) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `DateReleased` date NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
);
--Table structure for table `genre`


CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
);
-- Table structure for table `role`


CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
);
-- Table structure for table `status`


CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `available` enum('true','false') NOT NULL
);
-- Table structure for table `trx_book`


CREATE TABLE `trx_book` (
  `id` char(12) NOT NULL,
  `id_book` char(10) NOT NULL,
  `daterent` date DEFAULT NULL,
  `datereturn` date DEFAULT NULL,
  `datereturnuser` date DEFAULT NULL,
  `user_id` int(11) NOT NULL
);
-- Table structure for table `user`


CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
);
-- Stand-in structure for view `v_book`

CREATE TABLE `v_book` (
`id` char(10)
,`Title` varchar(40)
,`Description` varchar(255)
,`Image` varchar(255)
,`DateReleased` date
,`available` enum('true','false')
,`genre` varchar(20)
);

-- Stand-in structure for view `v_user`

CREATE TABLE `v_user` (
`id` int(11)
,`email` varchar(40)
,`username` varchar(40)
,`password` varchar(255)
,`role` varchar(10)
);
-- Structure for view `v_book`

DROP TABLE IF EXISTS `v_book`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_book`  AS  select `book`.`id` AS `id`,`book`.`Title` AS `Title`,`book`.`Description` AS `Description`,`book`.`Image` AS `Image`,`book`.`DateReleased` AS `DateReleased`,`status`.`available` AS `available`,`genre`.`name` AS `genre` from ((`book` join `genre` on((`book`.`id_genre` = `genre`.`id`))) join `status` on((`book`.`id_status` = `status`.`id`))) ;


-- Structure for view `v_user`

DROP TABLE IF EXISTS `v_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user`  AS  select `user`.`id` AS `id`,`user`.`email` AS `email`,`user`.`username` AS `username`,`user`.`password` AS `password`,`role`.`name` AS `role` from (`user` join `role` on((`user`.`role_id` = `role`.`id`))) ;


-- Indexes for dumped tables
-- Indexes for table `book`

ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_status` (`id_status`),
  ADD KEY `id_genre` (`id_genre`);

-- Indexes for table `genre`

ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);


-- Indexes for table `role`

ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);


-- Indexes for table `status`

ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);


-- Indexes for table `trx_book`

ALTER TABLE `trx_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_book` (`id_book`),
  ADD KEY `userid` (`user_id`);

-- Indexes for table `user`

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);


-- AUTO_INCREMENT for dumped tables



-- AUTO_INCREMENT for table `genre`

ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


-- AUTO_INCREMENT for table `role`

ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


-- AUTO_INCREMENT for table `status`

ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


-- AUTO_INCREMENT for table `user`

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


-- Constraints for dumped tables



-- Constraints for table `book`

ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id`);


-- Constraints for table `trx_book`

ALTER TABLE `trx_book`
  ADD CONSTRAINT `trx_book_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `trx_book_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);


-- Constraints for table `user`

ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;