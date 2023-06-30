const signup_form = document.getElementById("signup_form");
const signup_username = document.getElementById("signup_username");
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const ul = document.getElementById("ul1");

const login_form = document.getElementById("login_form");
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const ull = document.getElementById("ul2");

const forgot_password = document.querySelector(".forgot_password");

signup_form.addEventListener("submit", onsubmit);

function onsubmit(e) {
  e.preventDefault();

  const obj = {
    username: signup_username.value,
    email: signup_email.value,
    password: signup_password.value,
  };

  async function postdata() {
    try {
      const response = await axios.post("http://localhost:5000/sign-up", obj);
      ul.innerHTML = "";
    } catch (error) {
      ul.innerHTML = "";
      const li = document.createElement("li");
      li.innerHTML = `<span>  Email Already Exists !!</span>`;
      ul.appendChild(li);
    }
  }
  postdata();

  signup_username.value = "";
  signup_email.value = "";
  signup_password.value = "";
}

login_form.addEventListener("submit", login_submit);

function login_submit(e) {
  e.preventDefault();

  const obj = {
    email: login_email.value,
    password: login_password.value,
  };

  async function loginpost() {
    try {
      const response = await axios.post("http://localhost:5000/login", obj);
      const result = response.data;
      const res = result.data;

      localStorage.setItem("userId", res);
      ull.innerHTML = "";
      window.location.href = "/UI/Expenses/expense.html";
    } catch (error) {
      const error_data = error.response.data.err;
      const error_object = error_data.error;

      ull.innerHTML = "";
      const li = document.createElement("li");
      li.innerHTML = `<span> ${error_object} </span>`;
      ull.appendChild(li);
    }
  }
  loginpost();
  login_email.value = "";
  login_password.value = "";
}

forgot_password.addEventListener("click", () => {
  window.open("http://127.0.0.1:5500/UI/Signup_login/forgot_password.html");
});
