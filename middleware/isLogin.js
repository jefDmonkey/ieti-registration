const isLoginAdmin = (req, res, next) => {
    if(!req.session.admin) return res.redirect("/login")
    next();
}

const isLoginStudent = (req, res, next) => {
    if(!req.session.student) return res.redirect("/login")
    next();
}

const isLogout = (req, res, next) => {
    if(req.session.student) return res.redirect("/student/studDashboard")
    if(req.session.admin) return res.redirect("/adminDashboard")
    next();
}

module.exports = { isLoginAdmin, isLoginStudent, isLogout }