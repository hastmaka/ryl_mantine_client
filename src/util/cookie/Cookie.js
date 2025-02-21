export const setCookie = (cName, cValue, exDays) => {
    let d = new Date(),
        expires = exDays;
    if (typeof exDays === 'number') {
        d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
        expires = "expires=" + d.toUTCString();
    }
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}


export const getCookie = (cName) => {
    let name = cName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const checkCookie = () => {
    let user = getCookie("username");
    if (user !== "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
