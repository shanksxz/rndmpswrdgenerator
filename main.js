const lenvalue = document.querySelector("#lengthvalue");
const leninput = document.querySelector("#lengthinput");
lenvalue.textContent = leninput.value;
leninput.addEventListener("input", (event) => {
  lenvalue.textContent = event.target.value;
});
