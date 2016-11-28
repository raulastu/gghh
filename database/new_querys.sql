SELECT (count(*) > 0) as correct_login , A.verified as verified_account
FROM login A
WHERE A.email = '123'
AND A.pass = MD5('123');

select * from assistant where pichanga_id = 2 order by rand();

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
WHERE C.person_id = 23;

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
WHERE C.pichanga_id = 2;

select *
from person
left join team
on team.team_id = person.team_id;

SELECT A.pichanga_id, B.person_id, B.name, B.phone, B.email, A.comment, A.payment
FROM assistant A, person B
WHERE A.pichanga_id = 2
AND A.person_id = B.person_id;

SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details,
B.name as organizator_name, B.email, B.phone, P.min_assistants, P.max_assistants, count(C.person_id) as assistant_count
FROM pichanga P
LEFT JOIN assistant C
ON C.pichanga_id = P.pichanga_id
LEFT JOIN person B
ON P.organizator_id = B.person_id
RIGHT JOIN crew_member M
ON M.person_id = 1
RIGHT JOIN crew_guest G
ON G.pichanga_id = P.pichanga_id
AND G.crew_id = M.crew_id
WHERE 1 = 1
AND DATE(P.start_date) >= "2010-07-26"
AND DATE(P.end_date) <= "2030-09-05"
GROUP BY P.pichanga_id;

select * from crew_member;

select * from crew;

select * from crew_guest;

insert into crew_member values (1,2);

insert into crew_guest values (2,2);

select * from pichanga;


SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.place_name, P.fee, P.pay_mode, P.organizator_id, P.details,
P.private, B.name as organizator_name, B.email, B.phone, P.min_assistants, P.max_assistants, P.lat, P.lng, count(C.person_id) as assistant_count
FROM pichanga P
LEFT JOIN assistant C
ON C.pichanga_id = P.pichanga_id
LEFT JOIN person B
ON P.organizator_id = B.person_id
WHERE P.pichanga_id = 17
GROUP BY P.pichanga_id;

SELECT P.person_id, P.name, P.phone, P.email, L.token
FROM person P, login L
WHERE P.email = L.email
AND L.verified = TRUE;

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
GROUP BY B.person_id;

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count, D.token
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
LEFT JOIN login D
ON D.email = B.email
WHERE D.verified = TRUE
GROUP BY B.person_id
ORDER BY pichanga_count DESC;

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
WHERE B.email = 'asd'
GROUP BY B.person_id;

SELECT count(*) as message_count, B.last_connection
FROM chatline A, ( 
	SELECT ( IF (count(*)=0, "1980-12-08 23:59:59.59", last_connection) ) as last_connection
	FROM connectionhistory
	WHERE room_id = 13
	AND person_id = 2 ) B
WHERE A.room_id = 13
AND A.sent_date > B.last_connection;


SELECT A.room_id, A.person_id, A.message, A.sent_date, (A.sent_date < B.last_connection) as seen
FROM chatline A, (
	SELECT ( IF (count(*)=0, "1980-12-08 23:59:59.59", last_connection) ) as last_connection
	FROM connectionhistory
	WHERE room_id = 13
	AND person_id = 2 
) B
WHERE A.room_id = 13;

INSERT INTO connectionhistory (room_id, person_id, last_connection)
VALUES (14, 6, current_timestamp() )
ON DUPLICATE KEY UPDATE
last_connection = current_timestamp();

select count(A.person_id)
from person P
left join assistant A
on A.pichanga_id = 2
group by P.person_id;

use pichangamaker;

SELECT B.person_id, B.email, B.name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count, D.token
FROM person B
LEFT JOIN team A
ON A.team_id = B.team_id
LEFT JOIN assistant C
ON C.person_id = B.person_id
LEFT JOIN login D
ON D.email = B.email
LEFT JOIN pichanga P
ON P.pichanga_id = C.pichanga_id
RIGHT JOIN crew_guest G
ON G.pichanga_id = P.pichanga_id
RIGHT JOIN crew_member M
ON M.person_id = 1
AND M.crew_id = G.crew_id
WHERE D.verified = TRUE
GROUP BY B.person_id
ORDER BY pichanga_count DESC;


select * from pichanga where pichanga_id = 2;

select * from assistant where pichanga_id = 2;

select * from crew_guest;

SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details,
B.name as organizator_name, B.email, B.phone, P.min_assistants, P.max_assistants, count(C.person_id) as assistant_count;

SELECT *
FROM pichanga P
LEFT JOIN crew_guest G
ON G.pichanga_id = P.pichanga_id
LEFT JOIN crew_member M
ON G.crew_id = M.crew_id
LEFT JOIN person B
ON M.person_id = B.person_id
LEFT JOIN (		
	SELECT P.pichanga_id, count(A.pichanga_id)
	FROM pichanga P
	LEFT JOIN crew_guest G
	ON G.pichanga_id = P.pichanga_id
	LEFT JOIN crew_member M
	ON G.crew_id = M.crew_id
	LEFT JOIN person B
	ON M.person_id = B.person_id
	LEFT JOIN assistant A
	ON A.pichanga_id = P.pichanga_id
	WHERE 1 = 1
	AND B.person_id = 1
	GROUP BY P.pichanga_id
) J
ON J.pichanga_id = P.pichanga_id
WHERE 1 = 1
AND B.person_id = 1
GROUP BY P.pichanga_id

;

SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants,
B.name as organizator_name, B.email, B.phone, L.name as place_name, count(A.pichanga_id) as assistant_count
FROM pichanga P
LEFT JOIN crew_guest G
ON G.pichanga_id = P.pichanga_id
LEFT JOIN crew_member M
ON G.crew_id = M.crew_id
LEFT JOIN person B
ON M.person_id = B.person_id
LEFT JOIN assistant A
ON A.pichanga_id = P.pichanga_id
LEFT JOIN place L
ON L.place_id = P.place_id
WHERE 1 = 1
AND B.person_id = 1
GROUP BY P.pichanga_id
;

SELECT P.person_id, P.name, P.email, P.user
FROM person P
LEFT JOIN crew_member M
ON M.person_id = P.person_id
LEFT JOIN crew_guest G
ON G.crew_id = M.crew_id
LEFT JOIN pichanga S
ON S.pichanga_id = G.pichanga_id
WHERE 1 = 1
AND S.pichanga_id = 24
GROUP BY P.person_id;



select * from crew_guest;

select * from crew_member;

select * from crew;

select * from crew_guest;

select * from pichanga;

select * from person;

SET FOREIGN_KEY_CHECKS=1;
