"use strict";
// Role Enum
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
})(Role || (Role = {}));
// Auth Service
class AuthService {
    users = [
        { username: "admin", password: "12345", role: Role.Admin },
        { username: "user", password: "abcde", role: Role.User }
    ];
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        return user || null;
    }
}
// Dashboard Service
class DashboardService {
    redirect(user) {
        const output = document.getElementById("output");
        if (user.role === Role.Admin) {
            output.innerText += "\nRedirecting to Admin Dashboard...";
        }
        else {
            output.innerText += "\nRedirecting to User Dashboard...";
        }
    }
}
// Objects
const authService = new AuthService();
const dashboardService = new DashboardService();
// Main Function
function runApp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const output = document.getElementById("output");
    output.innerText = "";
    if (username === "" || password === "") {
        output.innerText = "Please enter username and password";
        return;
    }
    const user = authService.login(username, password);
    if (user) {
        output.innerText = `Login Successful: ${user.role}`;
        dashboardService.redirect(user);
    }
    else {
        output.innerText = "Invalid Credentials";
    }
}
