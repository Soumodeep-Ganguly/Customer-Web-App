module.exports = function (app) {
    var appController = require("../controllers/appController");

    app

    .get("/selectCustomers", appController.selectCustomers)

    .post("/selectCustomerById", appController.selectCustomerById)

    .post("/insertCustomer", appController.insertCustomer)

    .post("/updateCustomer", appController.updateCustomer)

    .post("/deleteCustomer", appController.deleteCustomer)
};
