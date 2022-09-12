"use strict";

window.addEventListener("DOMContentLoaded", start);

// The prototype for all animals:
const Student = {
  firstName: "",
  nickName: "",
  middelName: "",
  lastName: "",
  gender: "",
  house: "",
  image: "null",
};

let allStudents;

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  //filter
  document
    .querySelector("[data-filter=gryffindor]")
    .addEventListener("click", gryffindorFilterBtn); //gry
  document
    .querySelector("[data-filter=ravenclaw]")
    .addEventListener("click", ravenclawFilterBtn); //rav
  document
    .querySelector("[data-filter=all]")
    .addEventListener("click", allFilterBtn); //all
  document
    .querySelector("[data-filter=hufflepuff]")
    .addEventListener("click", hufflepuffFilterBtn); //huf
  document
    .querySelector("[data-filter=slytherin]")
    .addEventListener("click", slytherinFilterBtn); //sly

  //sort
  document
    .querySelector("[data-sort=firstName]")
    .addEventListener("click", sortFirstNames); //fir
  document
    .querySelector("[data-sort=lastName]")
    .addEventListener("click", sortLastNames); //las
  document
    .querySelector("[data-sort=house]")
    .addEventListener("click", sortHouses); //hou

  loadJSON();
}
//filter functions
function gryffindorFilterBtn() {
  const onlygryffindor = allStudents.filter(isGryffindor);
  displayList(onlygryffindor);
}
function ravenclawFilterBtn() {
  const onlyravenclaw = allStudents.filter(isRavenclaw);
  displayList(onlyravenclaw);
}
function hufflepuffFilterBtn() {
  const onlyhufflepuff = allStudents.filter(isHufflepuff);
  displayList(onlyhufflepuff);
}
function slytherinFilterBtn() {
  const onlyslytherin = allStudents.filter(isSlytherin);
  displayList(onlyslytherin);
}
function allFilterBtn() {
  console.log("all students filter button cliked ");
  displayList(allStudents);
}

//sort functions
//firstname
function sortFirstNames() {
  console.log("sorting by firstname clicked");
  allStudents.sort(compareFirstNames);
  displayList(allStudents);
}

//lastname

function sortLastNames() {
  console.log("sorting by lastname clicked");
  allStudents.sort(compareLastNames);
  displayList(allStudents);
}

//house
function sortHouses() {
  console.log("sorting by house");
  allStudents.sort(compareHouses);
  displayList(allStudents);
}

async function loadJSON() {
  const response = await fetch("studentlist.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allStudents = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allStudents);
}

function preapareObject(jsonElmObject) {
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

  //NICKNAME
  if (fullname.includes(`"`)) {
    student.nickName =
      fullname
        .substring(fullname.indexOf(`"`) + 1, fullname.indexOf(`"`) + 2)
        .toUpperCase() +
      fullname
        .substring(fullname.indexOf(`"`) + 2, fullname.lastIndexOf(`"`))
        .toLowerCase();
    //removing the name fron the middlename because its a nickname
    student.middelName = "";
    //console.log(student.nickName)
  }
  //LASTNAME
  //trim + uppercase on the first letter and the rest lowercase
  student.lastName =
    fullname
      .substring(fullname.lastIndexOf(" ") + 1, fullname.lastIndexOf(" ") + 2)
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
  student.image =
    fullname.substring(fullname.lastIndexOf(" ")).trim().toLowerCase() +
    "_" +
    fullname.substring(0, 1).toLowerCase() +
    ".png";

  if (fullname.includes("-")) {
    student.image =
      fullname.substring(fullname.lastIndexOf("-") + 1).toLowerCase() +
      "_" +
      fullname.substring(0, 1).toLowerCase() +
      ".png";
    console.log(student.image);
  }

  //console.log(student);

  return student;
}

function displayList(student) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";
  // build a new list
  student.forEach(displayStudents);
}

function displayStudents() {
  //console.table(data.studentArray);
  const studentList = document.querySelector("#list");

  allStudents.forEach((student) => {
    const template = document.querySelector("#student");
    let klon = template.cloneNode(true).content;

    klon.querySelector(
      "[data-field=firstName]"
    ).textContent = `Firstname: ${student.firstName}`;
    klon.querySelector(
      "[data-field=middleName]"
    ).textContent = `Middlename: ${student.middleName}`;
    klon.querySelector(
      "[data-field=nickName]"
    ).textContent = `NickName: ${student.nickName}`;
    klon.querySelector(
      "[data-field=lastName]"
    ).textContent = `Lastname: ${student.lastName}`;
    klon.querySelector(
      "[data-field=gender]"
    ).textContent = `Gender: ${student.gender}`;
    klon.querySelector(
      "[data-field=house]"
    ).textContent = `House: ${student.house}`;
    klon.querySelector(".images").src = `/images/${student.image}`;

    studentList.appendChild(klon);
  });
}
//gryffindor
function isGryffindor(student) {
  console.log("gryffindor clicked");

  if (student.house == "gryffindor") {
    return true;
  }
  return false;
}
//ravenclaw
function isRavenclaw(student) {
  console.log("ravenclaw clicked");

  if (student.house == "ravenclaw") {
    return true;
  }
  return false;
}
//hufflepuff
function isHufflepuff(student) {
  console.log("hufflepuff clicked");

  if (student.house == "hufflepuff") {
    return true;
  }
  return false;
}
//slytherin
function isSlytherin(student) {
  console.log("slytherin clicked");

  if (student.house == "slytherin") {
    return true;
  }
  return false;
}

//sort
function compareFirstNames(a, b) {
  if (a.firstName < b.firstName) {
    return -1;
  } else {
    return 1;
  }
}
function compareLastNames(a, b) {
  if (a.lastName < b.lastName) {
    return -1;
  } else {
    return 1;
  }
}

function compareHouses(a, b) {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }
}
