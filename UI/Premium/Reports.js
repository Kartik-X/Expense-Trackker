const user = document.querySelector(".expense-data tbody");
const from_date = document.querySelector("#from_date");
const to_date = document.querySelector("#end_date");
const show = document.querySelector("#show_button");
const download = document.querySelector("#download_button");
const pagination = document.querySelector(".pagination");
const home = document.querySelector("#home");

const itemsPerPage = 10;
let currentPage = 1;

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
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < totalItems; i++) {
    onscreen(data[i]);
  }

  createPaginationButtons(totalPages);

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

  function createPaginationButtons(totalPages) {
    pagination.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        show.click();
      }
    });
    pagination.appendChild(prevButton);

    let startPage, endPage;

    if (currentPage <= 2) {
      startPage = 1;
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 3);
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i < totalPages) {
        const button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
          currentPage = i;
          show.click();
        });
        if (i === currentPage) {
          button.classList.add("active");
        }
        pagination.appendChild(button);
      }
    }

    const lastPageButton = document.createElement("button");
    lastPageButton.innerText = totalPages;
    lastPageButton.addEventListener("click", () => {
      currentPage = totalPages;
      show.click();
    });
    pagination.appendChild(lastPageButton);

    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        show.click();
      }
    });
    pagination.appendChild(nextButton);
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
