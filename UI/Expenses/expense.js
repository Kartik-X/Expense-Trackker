const form = document.getElementById("form");
const amount = document.getElementById("exp_amount");
const description = document.getElementById("exp_desc");
const category = document.getElementById("category");
const date = document.getElementById("date");
const update = document.querySelector(".edit-wrap");
const user = document.querySelector(".expense-data tbody");

async function getdata() {
  const getitems = await axios.get("http://localhost:5000/expense");
  const response = getitems.data;
  const data = response.data;

  for (let i = 0; i < data.length; i++) {
    const response = getitems.data;
    const r = response.data;
    onscreen(r[i]);
  }
}
getdata();

function onscreen(get) {
  const exp_id = get.id;
  const exp_date = get.date;
  const exp_amt = get.expense_amount;
  const exp_desc = get.description;
  const exp_cat = get.category;

  const tr = document.createElement("tr");
  const td_date = document.createElement("td");
  const td_amt = document.createElement("td");
  const td_name = document.createElement("td");
  const td_cat = document.createElement("td");
  const td_action = document.createElement("td");

  td_date.innerText = exp_date;
  td_name.innerText = exp_desc;
  td_cat.innerText = exp_cat;
  td_amt.innerText = exp_amt;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<span class="Deletebtn">Delete</span>`;
  td_action.appendChild(deleteBtn);

  const editbtn = document.createElement("button");
  editbtn.innerHTML = `<span class= "editbtn">Edit</span>`;
  td_action.appendChild(editbtn);

  tr.appendChild(td_date);
  tr.appendChild(td_amt);
  tr.appendChild(td_name);
  tr.appendChild(td_cat);
  tr.appendChild(td_action);

  user.appendChild(tr);

  const obj = {
    date: exp_date,
    expense_amount: exp_amt,
    description: exp_desc,
    category: exp_cat,
  };
  console.log(obj);
  deleteBtn.addEventListener("click", async () => {
    deleteBtn.parentNode.parentNode.remove();
    deleteTask(exp_id);
  });

  editbtn.addEventListener("click", async () => {
    document.querySelector(".edit-wrap").style.display = "block";
    document.querySelector("button").style.display = "none";

    document.getElementById("date").value = exp_date;
    document.getElementById("exp_amount").value = exp_amt;
    document.getElementById("exp_desc").value = exp_desc;
    document.getElementById("category").value = exp_cat;

    const update = document.querySelector(".edit-wrap");

    update.addEventListener("click", async () => {
      const updatedDate = document.getElementById("date").value;
      const updatedAmount = document.getElementById("exp_amount").value;
      const updatedDescription = document.getElementById("exp_desc").value;
      const updatedCategory = document.getElementById("category").value;
      document.querySelector(".edit-wrap").style.display = "none";
      document.querySelector("button").style.display = "inline";

      const obj1 = {
        date: updatedDate,
        expense_amount: updatedAmount,
        description: updatedDescription,
        category: updatedCategory,
      };

      await axios.patch(`http://localhost:5000/expense/${exp_id}`, obj1);
      user.innerHTML = "";
      await getdata();
      document.getElementById("date").value = "";
      document.getElementById("exp_amount").value = "";
      document.getElementById("exp_desc").value = "";
      document.querySelector("button").style.display = "inline";
    });
  });
}

form.addEventListener("submit", onsubmit);

async function deleteTask(exp_id) {
  await axios.delete(`http://localhost:5000/expense/${exp_id}`);
}

function onsubmit(e) {
  e.preventDefault();
  // const tr = document.createElement("tr");
  // const td_date = document.createElement("td");
  // const td_amt = document.createElement("td");
  // const td_name = document.createElement("td");
  // const td_cat = document.createElement("td");
  // const td_action = document.createElement("td");

  let format = date.value.split("-");
  let newdate = `${format[2]}/${format[1]}/${format[0]}`;

  // td_date.innerText = newdate;
  // td_name.innerText = description.value;
  // td_cat.innerText = category.value;
  // td_amt.innerText = amount.value;

  // const deleteBtn = document.createElement("button");
  // deleteBtn.innerHTML = `<span class="Deletebtn">Delete</span>`;
  // td_action.appendChild(deleteBtn);

  // const editbtn = document.createElement("button");
  // editbtn.innerHTML = `<span class= "editbtn">Edit</span>`;
  // td_action.appendChild(editbtn);

  // tr.appendChild(td_date);
  // tr.appendChild(td_amt);
  // tr.appendChild(td_name);
  // tr.appendChild(td_cat);
  // tr.appendChild(td_action);

  // user.appendChild(tr);

  const obj = {
    date: newdate,
    expense_amount: amount.value,
    description: description.value,
    category: category.value,
  };

  async function postdata() {
    user.innerHTML = "";
    await axios.post("http://localhost:5000/expense", obj);
    await getdata();
  }
  postdata();

  date.value = "";
  description.value = "";
  amount.value = "";
}
