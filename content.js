// code injected onto the page
var password = document.getElementById('password');

function passwordExistInDump(string) {
    var xhr = new XMLHttpRequest();
    var requestAddress = "https://haveibeenpwned.com/api/v2/pwnedpassword/";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                console.info("Password found, use another password.");
                return true;
            }
            if (xhr.status == 404) {
                console.info("Password not found, this password good.");
                return false;
            }
        }
    }
    xhr.open("GET", requestAddress + string, true);
    xhr.send();
}

if (password !== null) {
    console.info("hi");
    setTimeout(function() {
        passwordExistInDump(password.value);
    }, 5000);
} else {
    console.info("bye");
}
