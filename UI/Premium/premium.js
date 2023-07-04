const userdata = document.querySelector(".premium-data tbody");
const home = document.querySelector(".home");

let pos = 1;

async function getdata() {
  const getitems = await axios.get("http://localhost:5000/premium-Lederboard");
  const result = getitems.data;
  const data = result.response;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    onscreen(data[i]);
  }
}
getdata();
async function onscreen(data) {
  const premium_user_position = pos;
  const premium_username = data.user_name;
  const premium_user_amount = data.Total_Expense;

  const tr = document.createElement("tr");

  const td_position = document.createElement("td");
  const td_name = document.createElement("td");
  const td_amount = document.createElement("td");

  td_position.innerText = premium_user_position;
  td_name.innerText = premium_username;
  td_amount.innerText = premium_user_amount;

  tr.appendChild(td_position);
  tr.appendChild(td_name);
  tr.appendChild(td_amount);

  userdata.appendChild(tr);
  pos++;
}

home.addEventListener("click", async () => {
  window.location.href = "/UI/Expenses/expense.html";
});
