use pichangamaker;

-- Remove the company

SET FOREIGN_KEY_CHECKS=0;

update person
set team_id = null
where person_id != -1;

truncate team;

SET FOREIGN_KEY_CHECKS=1;

-- Update login table

UPDATE login A, person B
SET A.email = B.email
WHERE A.email = B.user;