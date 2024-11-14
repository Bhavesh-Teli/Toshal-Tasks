const Add = document.getElementById("btnAdd");
const MainContainer = document.querySelector("#container"); // Ensure this selector is correct for your HTML
let Data = [];
Add.onclick = (e) => {
  const Name = document.getElementById("txtName").value;
  const Number = document.getElementById("txtNumber").value;
  const Email = document.getElementById("txtEmail").value;
  const Age = document.getElementById("txtAge").value;
  e.preventDefault();

  //   const fields = document.createElement("div");
  //   fields.classList.add("fields");
  //   fields.innerHTML = ` <li> ${Name} ${Number} ${Email} ${Age}</li><button class="edit">Edit</button> <button class="delete">Delete</button>`;

  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${Name}</td>
  <td>${Number}</td>
  <td>${Email}</td>
  <td>${Age}</td>
  <td><button class="edit">Edit</button></td>
  <td><button class="delete">Delete</button></td>
`;

  const entry = { row, Name, Number, Email, Age };

  Data.push(entry);
  MainContainer.append(row);

  row.querySelector(".delete").addEventListener("click", () => {
    MainContainer.removeChild(row);
    Data = Data.filter((item) => item !== entry);
  });
  row.querySelector(".edit").addEventListener("click", () => {
    document.getElementById("txtName").value = Name;
    document.getElementById("txtNumber").value = Number;
    document.getElementById("txtEmail").value = Email;
    document.getElementById("txtAge").value = Age;

    MainContainer.removeChild(row);
    Data = Data.filter((item) => item !== entry);
  });

  document.getElementById("txtName").value = "";
  document.getElementById("txtNumber").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtAge").value = "";
};
// console.log(Data);
document.getElementById("adultsFilter").addEventListener("change", (e) => {
  MainContainer.innerHTML = "";
  if (e.target.value === "adults") {
    Data.filter((entry) => entry.Age >= 18).forEach((entry) => {
      MainContainer.appendChild(entry.row);
      console.log(entry.row);
    });
    console.log(Data);
  } else if (e.target.value === "minor") {
    Data.filter((entry) => entry.Age < 18).forEach((entry) => {
      MainContainer.appendChild(entry.row);
    });
  } else {
    Data.forEach((entry) => {
      MainContainer.appendChild(entry.row);
      console.log(entry.row);
    });
  }
});
let ageSorted = false;
document.getElementById("ageHeader").addEventListener("click", () => {
  console.log("click");
  MainContainer.innerHTML = "";
  ageSorted = !ageSorted;

  Data.sort((a, b) => (ageSorted ? a.Age - b.Age : b.Age - a.Age));

  Data.forEach((entry) => {
    MainContainer.appendChild(entry.row);
  });
});
