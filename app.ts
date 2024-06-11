import inquirer from "inquirer";

class Student {
    static counter = 1;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }

    addCourse(course: string) {
        this.courses.push(course);
    }

    getBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    payFee(amount: number) {
        this.balance -= amount;
        console.log(`Fees paid successfully for ${this.name}, amount: ${amount}`);
    }

    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added successfully. Student ID: ${student.id}`);
    }

    enrollStudent(studentId: number, course: string) {
        let student = this.findStudent(studentId);
        if (student) {
            student.addCourse(course);
            console.log(`Student ${student.name} enrolled in ${course}`);
        } else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }

    viewStudentBalance(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.getBalance();
        } else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }

    payFee(studentId: number, amount: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFee(amount);
        } else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }

    showStudentStatus(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }

    findStudent(studentId: number): Student | undefined {
        return this.students.find(std => std.id === studentId);
    }
}

async function main() {
    console.log("\n\tWelcome To Code With Daniyal - STUDENT MANAGEMENT SYSTEM\n");
    let studentManager = new StudentManager();

    while (true) {
        let { choice } = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What do you want to do?",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fee",
                    "View Student Status",
                    "Exit"
                ]
            }
        ]);

        switch (choice) {
            case "Add Student":
                let { name } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter Student Name"
                    }
                ]);
                studentManager.addStudent(name);
                break;

            case "Enroll Student":
                let { student_id: enrollStudentId, course } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    },
                    {
                        type: "input",
                        name: "course",
                        message: "Enter Course Name"
                    }
                ]);
                studentManager.enrollStudent(parseInt(enrollStudentId), course);
                break;

            case "View Student Balance":
                let { student_id: viewBalanceStudentId } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.viewStudentBalance(parseInt(viewBalanceStudentId));
                break;

            case "Pay Fee":
                let { student_id: payFeeStudentId, amount } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    },
                    {
                        type: "input",
                        name: "amount",
                        message: "Enter Amount"
                    }
                ]);
                studentManager.payFee(parseInt(payFeeStudentId), parseFloat(amount));
                break;

            case "View Student Status":
                let { student_id: viewStatusStudentId } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.showStudentStatus(parseInt(viewStatusStudentId));
                break;

            case "Exit":
                console.log("Thank You For Using Our System");
                return;
        }
    }
}

main();
