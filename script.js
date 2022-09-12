"use strict";
window.addEventListener("DOMContentLoaded", init);
//json file
const url = "https://petlatkea.dk/2021/hogwarts/students.json";

// ?
const data = {};

// object - content
const Student = {
  firstName: "",
  nickName: "",
  middleName: "",
  lastName: "",
  gender: "",
  house: "",
  image: "null",
};

async function init() {
  // console.log("ready");
  data.studentArray = [];
  data.studentJSON = [];
  await loadJSON();
}

async function loadJSON() {
  const response = await fetch(url);
  data.studentJSON = await response.json();

  //console.log(data.studentJSON);

  prepareStudents();
}

function prepareStudents() {
  data.studentJSON.forEach((jsonElmObject) => {
    const student = Object.create(Student);

    //TRIM (fullname, house, gender)
    let fullname = jsonElmObject.fullname.trim();
    //console.log(fullname)
    let house = jsonElmObject.house.trim();
    //console.log(house);
    let gender = jsonElmObject.gender.trim();
    //console.log(gender);

    //FIRSTNAME
    //uppercase on the first letter and rest lowercase
    student.firstName =
      fullname.substring(0, 1).toUpperCase() +
      fullname.substring(1, fullname.indexOf(" ")).toLowerCase();
    //console.log(student.firstname);

    //MIDDLENAME
    //trim + uppercase on the first letter and the rest lowercase
    student.middleName =
      fullname
        .substring(fullname.indexOf(" "), fullname.lastIndexOf(" "))
        .trim()
        .substring(0, 1)
        .toUpperCase() +
      fullname
        .substring(fullname.indexOf(" "), fullname.lastIndexOf(" "))
        .trim()
        .substring(1)
        .toLowerCase();
    //console.log(student.middleName);
  
    //MIDDLENAME
      if (fullname.includes(`"`)){
        student.nickName = fullname.substring(fullname.indexOf(`"`) + 1, fullname.indexOf(`"`) + 2).toUpperCase() + fullname.substring(fullname.indexOf(`"`) + 2, fullname.lastIndexOf(`"`)).toLowerCase();
        //removing the name fron the middlename because its a nickname
        student.middleName= "";
        //console.log(student.nickName)
      }
        //LASTNAME
        //trim + uppercase on the first letter and the rest lowercase
        student.lastName =
          fullname
            .substring(
              fullname.lastIndexOf(" ") + 1,
              fullname.lastIndexOf(" ") + 2
            )
            .toUpperCase() +
          fullname.substring(fullname.lastIndexOf(" ") + 2).toLowerCase();
    //console.log(student.lastName);

    //GENDER
    student.gender =
      gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();
    //console.log(student.gender);

    //HOUSE
    student.house =
      house.substring(0, 1).toUpperCase() + house.substring(1).toLowerCase();
    //console.log(student.house);

    //IMAGE
    if (fullname.includes("-")){
        student.image = fullname.substring(fullname.lastIndexOf("-") + 1).toLowerCase() + "-" + fullname.substring(0,1).toLowerCase() + ".png";
        console.log(student.image)
    }
      //PUSH STUDENTS
      data.studentArray.push(student);
    //console.log(student);
  });
  showAllStudents();
}
function showAllStudents() {
  //console.table(data.studentArray);
  // display
  const studentList = document.querySelector("#list");
  data.studentArray.forEach((student) =>{
    //variabler
    const template = document.querySelector("#student");
    let klon = template.cloneNode(true).content;
    //kloning

    klon.querySelector("[data-field=firstName]").textContent = `Firstname: ${student.firstName}`;
    klon.querySelector("[data-field=middleName]").textContent = `Middlename: ${student.middleName}`;
    klon.querySelector("[data-field=nickName]").textContent = `NickName: ${student.nickName}`;
    klon.querySelector("[data-field=lastName]").textContent = `Lastname: ${student.lastName}`;
    klon.querySelector("[data-field=gender]").textContent = `Gender: ${student.gender}`;
    klon.querySelector("[data-field=house]").textContent = `House: ${student.house}`;
    klon.querySelector("[data-field=image]").src = `/images/${student.image}.png`;
   studentList.appendChild(klon);

  })
  
}
