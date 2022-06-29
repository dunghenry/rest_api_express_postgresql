const student = require('./student')
function route(app) {
    app.use('/api/student', student)
}

module.exports = route