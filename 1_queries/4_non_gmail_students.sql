SELECT name, id, email, cohort_id
FROM students 
WHERE NOT email LIKE '%gmail%'
AND phone IS NULL;