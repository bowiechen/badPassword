var password = document.getElementById("password");
var lastChanged = Date.now();

function passwordExistInDump(string) {
    if (string === "" || string == null) return;
    var xhr = new XMLHttpRequest();
    var requestAddress = "https://haveibeenpwned.com/api/v2/pwnedpassword";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                alert("Password compromised. Consider changing your password to something else.\n Data source: https://haveibeenpwned.com");
                // console.info("Password found, use another password.");
                return true;
            } else if (xhr.status == 404) {
                // console.info("Password not found, this password good.");
                return false;
            } else if (xhr.status == 429) {
                return false;
            }
        }
    }
    // GET
    xhr.open("GET", requestAddress + "/" + string, true);
    xhr.send();
    // POST?
    // xhr.open("POST", requestAddress, true);
    // xhr.send({"Password": string});
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 13) {
        passwordExistInDump(password.value);
    }
}


if (password !== null) {
    // console.info("engaged password field.");
    password.addEventListener("change", function() {
        if (Date.now() > lastChanged + 1750) {
            passwordExistInDump(password.value);
            lastChanged = Date.now();
        } else {
            lastChanged = Date.now();
        }
    });
} else {
    // console.info("could not find password field.");
}
