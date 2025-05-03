let user1Used = "";
let user2Used = "";
let userConnected = false;

document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        // Checking user 1 state
        fetch(`https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/1`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json())
            .then(data => {
                user1Used = data.used;
                console.log(user1Used)
            })
            .catch(err => {
                console.log(err);
                document.getElementById("user").innerHTML = "Erreure Revoir plus tard"
            })
        // Checking user 2 state
        fetch('https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/2', {
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).then(res => res.json())
            .then(data => {
                user2Used = data.used;
                console.log(user2Used)
            })
            .catch(err => {
                console.log(err);
                document.getElementById("user").innerHTML = "Erreure Revoir Plus Tard"
            })
        // Determining current user eligibility
        if (user1Used === "false" && userConnected !== "Utilisateur 2") {
            userConnected = "Utilisateur 1"
            fetch("https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/1", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        used: "true",
                        taken: "true"
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log("Current User using User1")
                    document.getElementById("user").innerHTML = "Utilisateur 1"
                })
                .catch(err => { console.log(err) })
        }
        if (user1Used === "true" && user2Used === "false" && userConnected !== "Utilisateur 1") {
            fetch("https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/2", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        used: "true",
                        taken: "true"
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log("Current User using User2")
                    document.getElementById("user").innerHTML = "Utilisateur 2"
                })
                .catch(err => { console.log(err) })
        }
        if (user1Used === "true" && user2Used === "true") {
            document.getElementById("dialog").close()
        }
    }, 3000);
});

// Resetting the roles
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        if (userConnected === "Utilisateur 1" && userConnected !== "Utilisateur 2") {
            fetch('https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/1', {
                    method: "PUT",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({
                        used: "false",
                        taken: "false"
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log(`User1Taken? = ${data.taken}`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (userConnected === "Utilisateur 2" && userConnected !== "Utilisateur 1") {
            fetch('https://68147b4b225ff1af1628f9c4.mockapi.io/Messaging/2', {
                    method: "PUT",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({
                        used: "false",
                        taken: "false"
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log(`User2Taken? = ${data.taken}`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
});
