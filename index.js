import inquirer from "inquirer";
class Student {
    static counter = 1;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }
    addCourse(course) {
        this.courses.push(course);
    }
    getBalance() {
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }
    payFee(amount) {
        this.balance -= amount;
        console.log(`Fees paid succesfully for ${this.name} paid fee of ${amount}`);
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added succesfully. Student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.addCourse(course);
            console.log(`Student ${student.name} enrolled in ${course}`);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.getBalance();
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    pay_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.payFee(amount);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("\n\tWelcome To Code With Daniyal - STUDENT MANAGMENT SYSTEM\n");
    let studentManager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
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
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter Student Name"
                    }
                ]);
                studentManager.addStudent(name_input.name);
                break;
            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
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
                studentManager.enroll_student(enroll_input.student_id, enroll_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fee":
                let fee_input = await inquirer.prompt([
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
                studentManager.pay_fee(fee_input.student_id, fee_input.amount);
                break;
            case "View Student Status":
                let status_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Thank You For Using Our System");
                return;
                break;
        }
    }
}
main();
