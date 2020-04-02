const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const queryString = `
SELECT students.id AS id, students.name AS name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2
`;
const cohortName = process.argv.slice(2)[0];
const limit = process.argv.slice(2)[1];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values).then((res) => {
  res.rows.forEach((user) => {
    console.log(
      `${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`
    );
  });
});
