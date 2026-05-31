let students =
JSON.parse(localStorage.getItem("students")) || [];

const searchInput =
document.getElementById("searchInput");

displayStudents();

function addStudent(){

let name =
document.getElementById("studentName")
.value.trim();

if(name===""){
alert("Please enter a name");
return;
}

students.push({
name:name,
present:false
});

saveData();

document.getElementById("studentName")
.value="";

displayStudents();
}

function toggleAttendance(index){

students[index].present =
!students[index].present;

saveData();
displayStudents();
}

function deleteStudent(index){

if(confirm("Delete student?")){

students.splice(index,1);

saveData();
displayStudents();
}
}

function editStudent(index){

let newName=
prompt(
"Enter new name",
students[index].name
);

if(newName && newName.trim()!==""){

students[index].name =
newName.trim();

saveData();

displayStudents();
}
}

function displayStudents(){

let list =
document.getElementById("studentList");

list.innerHTML="";

let searchTerm=
searchInput.value.toLowerCase();

let presentCount=0;

students.forEach((student,index)=>{

if(student.present){
presentCount++;
}

if(
student.name
.toLowerCase()
.includes(searchTerm)
){

list.innerHTML += `

<tr>

<td>${student.name}</td>

<td class="${
student.present
?
'present'
:
'absent'
}">

${
student.present
?
'Present'
:
'Absent'
}

</td>

<td>

<button
class="action-btn mark-btn"
onclick="toggleAttendance(${index})">

Mark

</button>

<button
class="action-btn edit-btn"
onclick="editStudent(${index})">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteStudent(${index})">

Delete

</button>

</td>

</tr>

`;
}

});

updateDashboard();
}

function updateDashboard(){

let total =
students.length;

let present =
students.filter(
s=>s.present
).length;

let absent =
total-present;

let percentage =
total===0
?
0
:
(present/total)*100;

document.getElementById(
"totalStudents"
).innerText=total;

document.getElementById(
"presentStudents"
).innerText=present;

document.getElementById(
"absentStudents"
).innerText=absent;

document.getElementById(
"attendancePercentage"
).innerText=
percentage.toFixed(1)+"%";
}

function saveData(){

localStorage.setItem(
"students",
JSON.stringify(students)
);
}

searchInput.addEventListener(
"input",
displayStudents
);

document.getElementById(
"themeBtn"
)
.addEventListener(
"click",
()=>{

document.body
.classList.toggle("dark");

if(
document.body
.classList
.contains("dark")
){

localStorage.setItem(
"theme",
"dark"
);

document.getElementById(
"themeBtn"
).innerText=
"☀️ Light Mode";

}
else{

localStorage.setItem(
"theme",
"light"
);

document.getElementById(
"themeBtn"
).innerText=
"🌙 Dark Mode";
}

}
);

if(
localStorage.getItem("theme")
==="dark"
){

document.body
.classList.add("dark");

document.getElementById(
"themeBtn"
).innerText=
"☀️ Light Mode";
}

function exportCSV(){

let csv =
"Name,Status\n";

students.forEach(student=>{

csv +=
`${student.name},${
student.present
?
"Present"
:
"Absent"
}\n`;

});

let blob =
new Blob(
[csv],
{type:"text/csv"}
);

let url =
window.URL.createObjectURL(blob);

let a =
document.createElement("a");

a.href=url;

a.download=
"attendance.csv";

a.click();

window.URL
.revokeObjectURL(url);
}