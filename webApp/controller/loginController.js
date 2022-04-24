try{
    let foundUser = users.find((data) => req.body.email === data.email);
    if (foundUser) {

        let submittedPass = req.body.password; 
        let storedPass = foundUser.password; 

        const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
        if (passwordMatch) {
            let usrname = foundUser.username;
            res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
        } else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
        }
    }
    else {

        let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
        await bcrypt.compare(req.body.password, fakePass);

        res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
    }
} catch{
    res.send("Internal server error");
}