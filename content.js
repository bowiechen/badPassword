var password = document.getElementById("password");
var lastChanged = Date.now();

function passwordExistInDump(string) {
    if (string === "" || string == null) return;
    var xhr = new XMLHttpRequest();
    var requestAddress = "https://haveibeenpwned.com/api/v2/pwnedpassword";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                // document.body.innerHTML = document.body.innerHTML.replace("Password", "Your password is potentially compromised. Change your password now.");
                alert('Password compromised. Consider choosing another password.');
                // console.info("Password found, use another password.");
                return true;
            } else if (xhr.status == 404) {
                // console.info("Password not found, this password good.");
                return false;
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open("GET", requestAddress + '/' + string, true);
    xhr.send();
    // POST
    // xhr.open("POST", requestAddress, true);
    // xhr.setRequestHeader("", );
    // xhr.send({"Password": string});
}


if (password !== null) {
    console.info("engaged password field.");
    password.addEventListener("change", function() {
        console.log(passwordExistInDump(password.value));
    });
} else {
    console.info("could not find password field.");
}
