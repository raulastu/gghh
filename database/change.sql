-- MySQL Workbench Synchronization

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

ALTER TABLE `pichangamaker`.`asistentes` 
DROP FOREIGN KEY `fk_Asistencia_Pichanga`,
DROP FOREIGN KEY `fk_Asistencia_Persona1`;

ALTER TABLE `pichangamaker`.`chatline` 
DROP FOREIGN KEY `fk_ChatLine_Pichanga1`,
DROP FOREIGN KEY `fk_ChatLine_Persona1`;

ALTER TABLE `pichangamaker`.`connectionhistory` 
DROP FOREIGN KEY `fk_ConnectionHistory_Pichanga1`,
DROP FOREIGN KEY `fk_ConnectionHistory_Persona1`;

ALTER TABLE `pichangamaker`.`persona` 
DROP FOREIGN KEY `fk_Persona_login1`,
DROP FOREIGN KEY `fk_Persona_Empresa1`;

ALTER TABLE `pichangamaker`.`pichanga` 
DROP FOREIGN KEY `fk_Pichanga_Persona1`;

ALTER TABLE `pichangamaker`.`asistentes` 
CHANGE COLUMN `idPichanga` `pichanga_id` INT(11) NOT NULL ,
CHANGE COLUMN `idPersona` `person_id` INT(11) NOT NULL ,
CHANGE COLUMN `pagoRealizado` `payment` DOUBLE NULL DEFAULT NULL ,
CHANGE COLUMN `observaciones` `comment` VARCHAR(120) NULL DEFAULT NULL ,
ADD INDEX `fk_Assistant_Pichanga1_idx` (`pichanga_id` ASC),
ADD INDEX `fk_Assistant_Person1_idx` (`person_id` ASC),
DROP INDEX `fk_Asistencia_Persona1_idx` ,
DROP INDEX `fk_Asistencia_Pichanga_idx` , RENAME TO  `pichangamaker`.`assistant` ;

ALTER TABLE `pichangamaker`.`chatline` 
DROP COLUMN `nombre`,
DROP COLUMN `user`,
CHANGE COLUMN `idPersona` `person_id` INT(11) NOT NULL AFTER `message`,
CHANGE COLUMN `idChatLine` `chat_line_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `fecha` `sent_date` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `texto` `message` VARCHAR(500) NULL DEFAULT NULL ,
CHANGE COLUMN `room` `room_id` INT(11) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`chat_line_id`),
ADD INDEX `fk_ChatLine_Person1_idx` (`person_id` ASC),
DROP INDEX `fk_ChatLine_Persona1_idx` ;

ALTER TABLE `pichangamaker`.`connectionhistory` 
DROP COLUMN `user`,
CHANGE COLUMN `idPichanga` `room_id` INT(11) NOT NULL FIRST,
CHANGE COLUMN `idPersona` `person_id` INT(11) NOT NULL ,
CHANGE COLUMN `lastConnection` `last_connection` DATETIME NULL DEFAULT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`room_id`, `person_id`),
ADD INDEX `fk_ConnectionHistory_Person1_idx` (`person_id` ASC);

ALTER TABLE `pichangamaker`.`login` 
CHANGE COLUMN `user` `email` VARCHAR(45) NOT NULL ;

ALTER TABLE `pichangamaker`.`persona` 
DROP COLUMN `dni`,
CHANGE COLUMN `user` `user` VARCHAR(35) NULL DEFAULT NULL AFTER `phone`,
CHANGE COLUMN `email` `email` VARCHAR(45) NOT NULL AFTER `user`,
CHANGE COLUMN `idPersona` `person_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `nombre` `name` VARCHAR(100) NULL DEFAULT NULL ,
CHANGE COLUMN `telefono` `phone` VARCHAR(15) NULL DEFAULT NULL ,
CHANGE COLUMN `idEmpresa` `team_id` INT(11) NULL DEFAULT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`person_id`),
DROP INDEX `fk_Persona_Login1_idx` ,
ADD INDEX `fk_Persona_Login1_idx` (`email` ASC),
ADD INDEX `fk_Persona_Team1_idx` (`team_id` ASC),
DROP INDEX `fk_Persona_Empresa1_idx` , RENAME TO  `pichangamaker`.`person` ;

ALTER TABLE `pichangamaker`.`pichanga` 
CHANGE COLUMN `idPersona` `organizator_id` INT(11) NOT NULL AFTER `pichanga_id`,
CHANGE COLUMN `idPichanga` `pichanga_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `nombre` `name` VARCHAR(120) NULL DEFAULT NULL ,
CHANGE COLUMN `precio` `fee` DOUBLE NULL DEFAULT NULL ,
CHANGE COLUMN `modoPago` `pay_mode` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `fechaInicio` `start_date` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `fechaFin` `end_date` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `minIntegrantes` `min_assistants` INT(11) NULL DEFAULT NULL ,
CHANGE COLUMN `maxIntegrantes` `max_assistants` INT(11) NULL DEFAULT NULL ,
CHANGE COLUMN `observaciones` `details` VARCHAR(120) NULL DEFAULT NULL ,
CHANGE COLUMN `lugar` `place_name` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `isPrivate` `private` TINYINT(1) NULL DEFAULT NULL ,
ADD COLUMN `duration_hours` INT(11) NULL DEFAULT NULL AFTER `start_date`;

ALTER TABLE `pichangamaker`.`empresa` 
DROP COLUMN `lng`,
DROP COLUMN `lat`,
CHANGE COLUMN `idEmpresa` `team_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `nombre` `name` VARCHAR(100) NULL DEFAULT NULL , RENAME TO  `pichangamaker`.`team` ;

ALTER TABLE `pichangamaker`.`assistant` 
ADD CONSTRAINT `fk_Assistant_Person1`
  FOREIGN KEY (`person_id`)
  REFERENCES `pichangamaker`.`person` (`person_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Assistant_Pichanga1`
  FOREIGN KEY (`pichanga_id`)
  REFERENCES `pichangamaker`.`pichanga` (`pichanga_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `pichangamaker`.`chatline` 
ADD CONSTRAINT `fk_ChatLine_Person1`
  FOREIGN KEY (`person_id`)
  REFERENCES `pichangamaker`.`person` (`person_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_ChatLine_Pichanga1`
  FOREIGN KEY (`room_id`)
  REFERENCES `pichangamaker`.`pichanga` (`pichanga_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `pichangamaker`.`connectionhistory` 
ADD CONSTRAINT `fk_ConnectionHistory_Person1`
  FOREIGN KEY (`person_id`)
  REFERENCES `pichangamaker`.`person` (`person_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_ConnectionHistory_Pichanga1`
  FOREIGN KEY (`room_id`)
  REFERENCES `pichangamaker`.`pichanga` (`pichanga_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `pichangamaker`.`person` 
ADD CONSTRAINT `fk_Persona_Login1`
  FOREIGN KEY (`email`)
  REFERENCES `pichangamaker`.`login` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Persona_Team1`
  FOREIGN KEY (`team_id`)
  REFERENCES `pichangamaker`.`team` (`team_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `pichangamaker`.`pichanga` 
ADD CONSTRAINT `fk_Pichanga_Persona1`
  FOREIGN KEY (`organizator_id`)
  REFERENCES `pichangamaker`.`person` (`person_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
