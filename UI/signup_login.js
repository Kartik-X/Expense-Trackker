const signup_form = document.getElementById("signup_form");
const signup_username = document.getElementById("signup_username");
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const ul = document.getElementById("ul");

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
      const response = await axios.post("http://localhost:5000/", obj);
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
