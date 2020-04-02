const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

pool
  .query(
    `
SELECT students.id AS id, students.name AS name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${process.argv.slice(2)[0]}%'
LIMIT ${process.argv.slice(2)[1]};
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.id} has an id of ${user.name} and was in the ${user.cohort_name} cohort`
      );
    });
  });
