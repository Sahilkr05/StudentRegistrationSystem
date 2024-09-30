// Create an array to store student records
let students = [];

// Function to register a new student
function registerStudent() {
    // Get values from input fields
    let studentName = document.getElementById('studentName').value;
    let studentId = document.getElementById('studentId').value;
    let email = document.getElementById('email').value;
    let contactNumber = document.getElementById('contactNumber').value;

    // Input validation: check if all fields are filled
    if (studentName === "" || studentId === "" || email === "" || contactNumber === "") {
        alert("Please fill all fields.");
        return;  // Stop the function if any field is empty
    }

    // Create a student object using basic OOP
    let student = {
        name: studentName,
        id: studentId,
        email: email,
        contact: contactNumber
    };

    // Add the student object to the students array
    students.push(student);

    // Update local storage to keep the data persistent
    localStorage.setItem('students', JSON.stringify(students));

    // Clear the input fields
    document.getElementById('studentForm').reset();

    // Refresh the student table to show the new student
    displayStudents();
}

// Function to display all registered students in the table
function displayStudents() {
    // Get the table body element where students will be displayed
    let tableBody = document.getElementById('studentTableBody');

    // Clear previous table content
    tableBody.innerHTML = "";

    // Loop through the students array and create a new row for each student
    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to edit a student's record
function editStudent(index) {
    // Get the student data to be edited
    let student = students[index];

    // Fill the input fields with the current data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNumber').value = student.contact;

    // Remove the student from the array temporarily
    students.splice(index, 1);

    // Update the local storage
    localStorage.setItem('students', JSON.stringify(students));

    // Refresh the student table
    displayStudents();
}

// Function to delete a student's record
function deleteStudent(index) {
    // Remove the student from the array
    students.splice(index, 1);

    // Update the local storage
    localStorage.setItem('students', JSON.stringify(students));

    // Refresh the student table
    displayStudents();
}

// Function to load students from local storage when the page loads
function loadStudents() {
    // Get the students from local storage
    let savedStudents = localStorage.getItem('students');

    // If there are students in local storage, load them into the array
    if (savedStudents) {
        students = JSON.parse(savedStudents);
    }

    // Display the students
    displayStudents();
}

// Call the loadStudents function when the page is loaded
window.onload = loadStudents;

// Attach the registerStudent function to the form submit event
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the page from refreshing
    registerStudent();
});
