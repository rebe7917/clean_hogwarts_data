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
  middelName: "",
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
    student.middelName =
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
    //console.log(student.middelName);
  
    //MIDDLENAME
      if (fullname.includes(`"`)){
        student.nickName = fullname.substring(fullname.indexOf(`"`) + 1, fullname.indexOf(`"`) + 2).toUpperCase() + fullname.substring(fullname.indexOf(`"`) + 2, fullname.lastIndexOf(`"`)).toLowerCase();
        //removing the name fron the middlename because its a nickname
        student.middelName= "";
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
    }
      //PUSH STUDENTS
      data.studentArray.push(student);
    //console.log(student);
  });
  showAllStudents();
}
function showAllStudents() {
  console.table(data.studentArray);
}
