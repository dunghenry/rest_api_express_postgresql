const pool = require('../config/connectDB');
const { getStudent, getStudents, checkEmai, createStudent, deleteStudent, updateStudent } = require('../queries')
const studentController = {
    getStudent: (req, res) => {
        const id = +req.params.id;
        pool.query(getStudent, [id], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results.rows);
        })
    },
    getStudents: (req, res) => {
        pool.query(getStudents, (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results.rows);
        })
    },
    createStudent: (req, res) => {
        const { name, email, age, dob } = req.body;
        pool.query(checkEmai, [email], (err, results) => {
            if (results.rows.length) {
                res.status(403).json('Email already exists.');
            } else {
                pool.query(createStudent, [name, email, age, dob], (err, results) => {
                    if (err) return res.status(500).json(err);
                    return res.status(201).json(results.rows[0]);
                })
            }
        })
    },
    deleteStudent: (req, res) => {
        const id = +req.params.id;
        pool.query(getStudent, [id], (err, results) => {
            if (err) return res.status(500).json(err);
            else {
                const student = results.rows.length
                if (!student) {
                    return res.status(404).json("Student not found.");
                }
                pool.query(deleteStudent, [id], (err, results) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Deleted successfully.")
                })
            }
        })
    },
    updateStudent: (req, res) => {
        const id = +req.params.id;
        const { name, email, age, dob } = req.body;
        pool.query(getStudent, [id], (err, results) => {
            if (err) return res.status(500).json(err);
            else {
                const student = results.rows[0];
                if (!results.rows.length) {
                    return res.status(404).json("Student not found.");
                }
                pool.query(updateStudent, [id, name ?? student.name, email ?? student.email, age ?? student.age, dob ?? student.dob], (err, results) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(results.rows[0])
                })
            }
        })
    }
}

module.exports = studentController;