INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Computer');
INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Civil');
INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Electronic');
INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Finance');
INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Education');
INSERT INTO `department` (`id`, `name`) VALUES (NULL, 'Medical');


INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'manager', '234', '1');
INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'doctor', '234', '6');
INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'director', '234', '4');
INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'employee', '234', '2');
INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'teacher', '234', '1');
INSERT INTO `Roles` (`id`, `title`, `salary`, `department_id`) VALUES (NULL, 'engineer', '234', '3');


INSERT INTO `Employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (NULL, 'hohn', 'abraham', '2', '3');
INSERT INTO `Employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (NULL, 'ram', 'sita', '1', '5');
INSERT INTO `Employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (NULL, 'shari', 'sherpa', '2', '3');
INSERT INTO `Employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (NULL, 'maxx', 'well', '2', '4');
INSERT INTO `Employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (NULL, 'sonam', 'singh', '2', '4');