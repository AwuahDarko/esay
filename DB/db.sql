CREATE schema esay;


CREATE TABLE `esay`.`control_board` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `board_name` VARCHAR(45) NULL,
  `client_status` TINYINT NULL DEFAULT 0,
  `board_status` TINYINT NULL DEFAULT 0,
  `client_request_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `board_response_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;