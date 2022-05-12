const express = require("express"); // import express so we can use express features
const app = express(); //create our app varible which is an instanc of express
const { faker } = require('@faker-js/faker');
const port = 8000;

//NEED THIS TO HANDLE POST REQUESTS. HAVE THESE TWO LINES BEFORE THE ROUTES!!!
app.use(express.json()); //lets our app convert form info inro json
app.use(express.urlencoded({extended:true})); //lets our app parse form information


class User{
    constructor() {
        this.password = faker.word.adverb(10)
        this.email = faker.internet.email()
        this.phoneNumber = faker.phone.phoneNumber();
        this.lastName = faker.name.lastName();
        this.firstName = faker.name.firstName();
        this.id = faker.random.numeric();
    }
}

class CompanyObject{
    constructor() {
        this.id = faker.random.numeric();
        this.name = faker.random.words();
        this.address = {
            street : faker.address.streetAddress(),
            city : faker.address.city(),
            state : faker.address.state(),
            zipCode : faker.address.zipCode(),
            country : faker.address.country()
        }
    }
}



//route that says hello world
app.get("/api/hello", (req, res) => {
    res.json({message: "Hello World"});
});

//route that creates and displays a new user
app.get("/api/user/new", (req, res) => {
    let newUser = new User();
    res.json({newUser});
})

//route that creates and displays a new company
app.get("/api/companies/new", (req,res) => {
    let newCompany = new CompanyObject();
    res.json({newCompany});
})

app.get("/api/user/company", (req,res) => {
    let newCompany = new CompanyObject();
    let newUser = new User();
    res.json([{newUser}, {newCompany}])
})


// Always have this as the closing line on the server
app.listen( port, () => console.log(`Listening on port: ${port}`) );



