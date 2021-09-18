const db = require ('../models/db_connection')

exports.login = (req, res, next) => {
    //1. body
    let email = req.body.username;
    let password = req.body.password;

    if(email == '' || email == undefined || password == '' || password == undefined ){
        res.status(500).send({
            successful: false,
            message: "Username and password are required"
        })
    }
    else {
        let searchQuery = `SELECT * FROM users WHERE username = '${username}'`
       db.query(searchQuery, (err, rows, result)=>{
           console.log("err==" +err);
           if(err) {
            res.status(500).send({
                successful: false,
                message: "Error in Query"
                })
           } else {
               console.log("rows ==" +JSON.stringify(rows));
               if(rows.length == 0) {
                res.status(404).send({
                    successful: false,
                    message: "Username does not Exist"
                    })
                }
                else {
                    let passwordDb = rows[0].password;
                    if(passwordDb == password) {
                        res.status(200).send({
                            successful: true,
                            message: "Successful Login"
                            })
                    }
                    else {
                        res.status(403).send({
                            successful: false,
                            message: "Password is Incorrect"
                            })
                    }
                }
           } 

       })
    }

    
    //2. param

    //3. query string
}

exports.createUser = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if(username == '' || username == undefined || password == '' || password == undefined ){
        res.status(500).send({
            successful: false,
            message: "Username and password are required"
        })
    }
    else {
        let selectUnameQuery = `SELECT username FROM users WHERE username = '${username}'`

        db.query(selectUnameQuery, (err, rows, result)=>{
            if(err) {
                res.status(500).send({
                    successful: false,
                    message: "Error in Query"
                    })
            }
            else {
                console.log("rows ==" +JSON.stringify(rows));
                if(rows.length == 0) {
                    //no username existing
                    let insertUserQuery =`INSERT INTO users SET ?`;

                    let insertUserData = {
                        username : username,
                        password : password
                    }

                    db.query(insertUserQuery, insertUserData, (err, rows, result) =>{
                        if(err) {
                            res.status(500).send({
                                successful: false,
                                message: err
                                })
                        }
                        else {
                            res.status(200).send({
                                successful: true,
                                message: "User Registered"
                                })
                        }
                    })

                }
                else {
                    res.status(500).send({
                        successful: false,
                        message: "Username Exists"
                    })
                }
            }
        })
    }    
}

exports.getUserList = (req, res, next) => {
    let selectUsers = `SELECT username FROM users`
    
    db.query(selectUsers = (err, rows, result)=>{
        if(err) {
            sendErrorResponse();
        }
        else{
            if(rows.length == 0) {
                res.status(200).send({
                    successful: true,
                    message: "No User Found"
                    })
            }
            else {
                res.status(200).send({
                    successful: true,
                    message: "Records Found:",
                    list: rows
                    })
                }

        }
    })

}

exports.updateUser = (req, res, next) => {
    let newUsername = req.body.username;
    let newPassword = req.body.password;
    let username = req.params.username;

    if(username == " " || username == undefined || newPassword == " " || newPassword == undefined || newUsername == " " || newUsername == undefined){
        res.status(500).send({
            successful: false,
            message: "Fields Required: Username, Password, New Username"
        })
    }
    else {
        //validate if new username is taken
        //validate if username  is existing in the database

        let selectUsernameQuery = `SELECT username FROM users WHERE username = '${newUsername}'`

        db.query(selectUsernameQuery, (err, rows, result)=>{
            if(err) {
                res.status(500).send({
                    successful: false,
                    message: err
                    })
            }
            else if (rows.length == 0){
                res.status(404).send({
                    successful: false,
                    message: "Username doesn't Exists"
                    })
            }
            else {
                let selectNewUsernameQuery = `SELECT username FROM users WHERE username = '${username}'`

                db.query(selectNewUsernameQuery, (err, rows, result)=>{
                    if(err) {
                        res.status(500).send({
                            successful: false,
                            message: err
                            })
                    }
                    else if (rows.length == 0){
                            let updateUserQuery = `UPDATE users SET username = '${newUsername}', password = '${newPassword}' WHERE username = '${username}'`

                            db.query(updateUserQuery, (err, rows, result)=>{
                                if(err) {
                                    res.status(500).send({
                                        successful: false,
                                        message: err
                                        })
                                }
                                else if (rows.affectedRows == 0) {
                                    res.status(404).send({
                                        successful: true,
                                        message: 'No records updated'
                                        })
                                }
                                else {
                                    res.status(200).send({
                                        successful: true,
                                        message: 'Username & Password Updated'
                                        })
                                }
                            })
                        
                     
                    }
                })
            }
        
        })
    }
}

exports.deleteUser = (req, res, next)=>{
    let username = req.query.username;

    if(username == "" || username == undefined) {
        res.status(500).send({
            successful: false,
            message: "Username is required."
        })
    }
    else {
        let deleteQuery = `DELETE FROM users WHERE username = '${username}'`

        db.query(deleteQuery, (err, rows,result)=>{
            if (err) {
                res.status(500).send({
                successful: false,
                message: "Error in Query"
           })
        }
        else if(rows.affectedRows == 0) {
            res.status(404).send({
                successful: true,
                message: "No User Found"
            })
        }
        else {
            res.status(200).send({
                successful: true,
                message: "User Deleted Successfully"
                })
            }
        })
    }
}