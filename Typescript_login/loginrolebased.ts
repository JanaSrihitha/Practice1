// Role Enum
enum Role {
    Admin = "ADMIN",
    User = "USER"
}

// User Interface
interface User {
    username: string;
    password: string;
    role: Role;
}

// Auth Service
class AuthService {
    private users: User[] = [
        { username: "admin", password: "12345", role: Role.Admin },
        { username: "user", password: "abcde", role: Role.User }
    ];

    login(username: string, password: string): User | null {
        const user = this.users.find(
            u => u.username === username && u.password === password
        );
        return user || null;
    }
}

// Dashboard Service
class DashboardService {
    redirect(user: User): void {
        const output = document.getElementById("output");

        if (user.role === Role.Admin) {
            output!.innerText += "\nRedirecting to Admin Dashboard...";
        } else {
            output!.innerText += "\nRedirecting to User Dashboard...";
        }
    }
}

// Objects
const authService = new AuthService();
const dashboardService = new DashboardService();

// Main Function
function runApp(): void {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const output = document.getElementById("output");

    output!.innerText = "";

    if (username === "" || password === "") {
        output!.innerText = "Please enter username and password";
        return;
    }

    const user = authService.login(username, password);

    if (user) {
        output!.innerText = `Login Successful: ${user.role}`;
        dashboardService.redirect(user);
    } else {
        output!.innerText = "Invalid Credentials";
    }
}