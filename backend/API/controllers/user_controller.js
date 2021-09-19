const db = require("../models/db_connection");

exports.login = (req, res, next) => {
  //1. body
  let username = req.body.username;
  let password = req.body.password;

  if (
    username == "" ||
    username == undefined ||
    password == "" ||
    password == undefined
  ) {
    res.status(500).send({
      successful: false,
      message: "Username and password are required",
    });
  } else {
    let searchQuery = `SELECT * FROM accounts WHERE Username = '${username}'`;
    db.query(searchQuery, (err, rows, result) => {
      console.log("err==" + err);
      if (err) {
        res.status(500).send({
          successful: false,
          message: "Error in Query",
        });
      } else {
        console.log("rows ==" + JSON.stringify(rows));
        if (rows.length == 0) {
          res.status(404).send({
            successful: false,
            message: "Username does not Exist",
          });
        } else {
          let passwordDb = rows[0].Password;
          if (passwordDb == password) {
            res.status(200).send({
              successful: true,
              message: "Successful Login",
              status: rows[0].status,
            });
          } else {
            res.status(403).send({
              successful: false,
              message: "Password is Incorrect",
            });
          }
        }
      }
    });
  }

  //2. param

  //3. query string
};

exports.createUser = (req, res, next) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let lastname = req.body.lastname;
  let middlename = req.body.middlename;
  let firstname = req.body.firstname;
  let contactnumber = req.body.contactnumber;
  let housenumber = req.body.housenumber;
  let street = req.body.street;
  let municipality = req.body.municipality;
  let province = req.body.province;
  let zipcode = req.body.zipcode;

  if (
    username == "" ||
    username == undefined ||
    password == "" ||
    password == undefined
  ) {
    res.status(500).send({
      successful: false,
      message: "Username and Password are required",
    });
  } else {
    let selectUnameQuery = `SELECT Username FROM accounts WHERE Username = '${username}'`;

    db.query(selectUnameQuery, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: "Error in Query",
        });
      } else {
        console.log("rows ==" + JSON.stringify(rows));
        if (rows.length == 0) {
          //no username existing
          let insertUserQuery = `INSERT INTO accounts SET ?`;

          let insertUserData = {
            Email: email,
            Username: username,
            Password: password,
            LastName: lastname,
            MiddleName: middlename,
            FirstName: firstname,
            ContactNumber: contactnumber,
            HouseNo: housenumber,
            Street: street,
            Municipality: municipality,
            Province: province,
            ZipCode: zipcode,
          };

          db.query(insertUserQuery, insertUserData, (err, rows, result) => {
            if (err) {
              res.status(500).send({
                successful: false,
                message: err,
              });
            } else {
              res.status(200).send({
                successful: true,
                message: "User Registered",
              });
            }
          });
        } else {
          res.status(500).send({
            successful: false,
            message: "Username Exists",
          });
        }
      }
    });
  }
};

exports.getUserList = (req, res, next) => {
  let selectUsers = `SELECT username FROM users`;

  db.query(
    (selectUsers = (err, rows, result) => {
      if (err) {
        sendErrorResponse();
      } else {
        if (rows.length == 0) {
          res.status(200).send({
            successful: true,
            message: "No User Found",
          });
        } else {
          res.status(200).send({
            successful: true,
            message: "Records Found:",
            list: rows,
          });
        }
      }
    })
  );
};

exports.updateUser = (req, res, next) => {
  let newUsername = req.body.username;
  let newPassword = req.body.password;
  let username = req.params.username;

  if (
    username == " " ||
    username == undefined ||
    newPassword == " " ||
    newPassword == undefined ||
    newUsername == " " ||
    newUsername == undefined
  ) {
    res.status(500).send({
      successful: false,
      message: "Fields Required: Username, Password, New Username",
    });
  } else {
    //validate if new username is taken
    //validate if username  is existing in the database

    let selectUsernameQuery = `SELECT Username FROM accounts WHERE Username = '${newUsername}'`;

    db.query(selectUsernameQuery, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: err,
        });
      } else if (rows.length == 0) {
        res.status(404).send({
          successful: false,
          message: "Username doesn't Exists",
        });
      } else {
        let selectNewUsernameQuery = `SELECT Username FROM Users WHERE Username = '${username}'`;

        db.query(selectNewUsernameQuery, (err, rows, result) => {
          if (err) {
            res.status(500).send({
              successful: false,
              message: err,
            });
          } else if (rows.length == 0) {
            let updateUserQuery = `UPDATE accounts SET Username = '${newUsername}', Password = '${newPassword}' WHERE Username = '${username}'`;

            db.query(updateUserQuery, (err, rows, result) => {
              if (err) {
                res.status(500).send({
                  successful: false,
                  message: err,
                });
              } else if (rows.affectedRows == 0) {
                res.status(404).send({
                  successful: true,
                  message: "No records updated",
                });
              } else {
                res.status(200).send({
                  successful: true,
                  message: "Username & Password Updated",
                });
              }
            });
          }
        });
      }
    });
  }
};

exports.deleteUser = (req, res, next) => {
  let username = req.query.username;

  if (username == "" || username == undefined) {
    res.status(500).send({
      successful: false,
      message: "Username is required.",
    });
  } else {
    let deleteQuery = `DELETE FROM users WHERE username = '${username}'`;

    db.query(deleteQuery, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: "Error in Query",
        });
      } else if (rows.affectedRows == 0) {
        res.status(404).send({
          successful: true,
          message: "No User Found",
        });
      } else {
        res.status(200).send({
          successful: true,
          message: "User Deleted Successfully",
        });
      }
    });
  }
};
