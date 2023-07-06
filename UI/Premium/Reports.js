const user = document.querySelector(".expense-data tbody");
const from_date = document.querySelector("#from_date");
const to_date = document.querySelector("#end_date");
const show = document.querySelector("#show_button");
const download = document.querySelector("#download_button");
const home = document.querySelector("#home");

show.addEventListener("click", async (e) => {
  e.preventDefault();
  user.innerText = "";
  let start_Date_format = from_date.value.split("-");
  let end_Date_format = to_date.value.split("-");
  let start_date = `${start_Date_format[2]}/${start_Date_format[1]}/${start_Date_format[0]}`;
  let end_date = `${end_Date_format[2]}/${end_Date_format[1]}/${end_Date_format[0]}`;

  const token = localStorage.getItem("userId");
  const getitems = await axios.get("http://localhost:5000/expense-period", {
    headers: { Authorization: token },
    params: { Start_Date: start_date, End_Date: end_date },
  });

  const response = getitems.data;
  const data = response.data;

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    onscreen(data[i]);
  }

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

    tr.appendChild(td_date);
    tr.appendChild(td_amt);
    tr.appendChild(td_name);
    tr.appendChild(td_cat);

    user.appendChild(tr);
  }
});

home.addEventListener("click", async () => {
  window.location.href = "/UI/Expenses/expense.html";
});

download.addEventListener("click", async (e) => {
  e.preventDefault();
  user.innerText = "";
  let start_Date_format = from_date.value.split("-");
  let end_Date_format = to_date.value.split("-");
  let start_date = `${start_Date_format[2]}/${start_Date_format[1]}/${start_Date_format[0]}`;
  let end_date = `${end_Date_format[2]}/${end_Date_format[1]}/${end_Date_format[0]}`;

  const token = localStorage.getItem("userId");
  const download = await axios.get("http://localhost:5000/download", {
    headers: { Authorization: token },
    params: { Start_Date: start_date, End_Date: end_date },
  });
  window.open(download.data.data);
});
