const getStudents = "SELECT * FROM students";
const getStudent = "SELECT * FROM students WHERE id = $1";
const checkEmai = "SELECT s FROM students s where s.email = $1";
const createStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) RETURNING *";
const deleteStudent = "DELETE FROM students WHERE id = $1";
const updateStudent = "UPDATE students SET name = $2, email = $3, age = $4, dob = $5 WHERE id = $1 RETURNING *";
module.exports = { getStudents, getStudent, checkEmai, createStudent, deleteStudent, updateStudent }