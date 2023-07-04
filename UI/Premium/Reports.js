function openTab(event, tabName) {
  var i, tabcontent, tab;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tab = document.getElementsByClassName("tab");
  for (i = 0; i < tab.length; i++) {
    tab[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}

document.getElementById("daily").style.display = "block";
document.getElementsByClassName("tab")[0].classList.add("active");
