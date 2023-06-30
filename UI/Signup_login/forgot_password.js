const form = document.getElementById("form");
const login_email = document.getElementById("login-email");
const sent = document.getElementById("h5");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(login_email.value);

  const password_reset = await axios.post(
    "http://localhost:5000/forgot-password",
    { login_email: login_email.value }
  );
  console.log(123);
  sent.innerHTML = `<span>Password Sent Successfully!! Kindly check your mail to reset Password</span>`;
});
