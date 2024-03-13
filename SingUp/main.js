const submitButton = document.getElementById("submit_button");
const passMain = document.getElementById("pass_1");
const passConfirm = document.getElementById("pass_2");
const notMatch = document.getElementById("not_match");

submitButton.disabled = true;
passMain.addEventListener("input", checkPasswords);
passConfirm.addEventListener("input", checkPasswords);

function checkPasswords(pass) {
    if (passMain.value === passConfirm.value) {
        submitButton.disabled = false;
        passMain.classList.remove("error");
        passConfirm.classList.remove("error")
        notMatch.hidden = true;
    } else {
        submitButton.disabled = true;
        passMain.classList.add("error");
        passConfirm.classList.add("error");
        notMatch.hidden = false;
    };
};
