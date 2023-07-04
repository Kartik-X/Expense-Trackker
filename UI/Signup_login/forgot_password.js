const form = document.getElementById("form");
const login_email = document.getElementById("login-email");
const sent = document.getElementById("confirm-text");
const invalid = document.getElementById("incorrect-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const password_reset = await axios.post(
      "http://localhost:5000/forgot-password",
      { login_email: login_email.value }
    );
    invalid.innerHTML = "";
    sent.innerHTML = `<span>Password Sent Successfully!! Kindly check your mail to reset Password</span>`;
    login_email.value = "";
  } catch (error) {
    sent.innerHTML = "";
    invalid.innerHTML = `<span>Invalid Email!! Kindly enter a valid email </span>`;
    login_email.value = "";
  }
});
