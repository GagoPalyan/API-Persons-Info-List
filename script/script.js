const select = document.getElementById("PersonName");
const dataInfo = document.getElementById("dataInfo");
const personMenu = document.getElementById("personInfo");
const closeBtn = document.getElementById("close");
let data;

let getUsers = new XMLHttpRequest();
getUsers.open("GET", "https://jsonplaceholder.typicode.com/users");
getUsers.send();
getUsers.onreadystatechange = (response) => {
  if (getUsers.readyState == XMLHttpRequest.DONE) {
    data = JSON.parse(response.target.response);
    data.forEach((el) => {
      let nameList = document.createElement("option");
      nameList.innerText = el.name;
      nameList.value = el.id;
      select.appendChild(nameList);
    });
  }
};

function createList(obj, objName) {
  Object.entries(obj).forEach((x) => {
    if (typeof x[1] == "object") {
      createList(x[1], x[0]);
    } else {
      let personInfo = document.createElement("li");
      if (objName == undefined) {
        personInfo.innerText = `${x[0]}: ${x[1]}`;
      } else {
        personInfo.innerText = `${objName}-${x[0]}: ${x[1]}`;
      }
      dataInfo.appendChild(personInfo);
    }
  });
}

select.addEventListener("change", (e) => {
  dataInfo.innerHTML = "";
  data.forEach((element) => {
    if (element.id == e.target.value) {
      personMenu.style.display = "flex";
      dataInfo.innerHTML = "<li>Person Information</li>";
      createList(element);
    }
  });
});

closeBtn.addEventListener("click", () => {
  personMenu.style.display = "none";
});
