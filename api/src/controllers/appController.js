// Required Models
const Customer = require("../models/Customer");
const Address = require("../models/Address");

module.exports = {
    // Get Customer List
    selectCustomers: async function (req, res) {
        try {
            let where = {}
            let sort = {}
            let limit = '10'
            let skip = '0'
            if(req.query.limit && req.query.limit != "") limit = req.query.limit
            if(req.query.skip && req.query.skip != "") skip = req.query.skip
            if(req.query.sortBy && req.query.sortBy != ""){
                switch(req.query.sortBy.toLowerCase()) {
                    case "a-z": sort['firstName'] = 1; break;
                    case "z-a": sort['firstName'] = -1; break;
                    default: ;
                }
            }
            
            if (req.query.search && req.query.search != "") {
                where["$or"] = [{
                    firstName: {
                            $regex: ".*" + req.query.search,
                            $options: "i",
                        }
                }, { 
                    lastName: {
                            $regex: ".*" + req.query.search,
                            $options: "i",
                        }
                }, { 
                    userName: {
                            $regex: ".*" + req.query.search,
                            $options: "i",
                        }
                },{ 
                    email: {
                            $regex: ".*" + req.query.search,
                            $options: "i",
                        }
                }];
            }
            
            let customers = await Customer.find(where).sort(sort).skip(parseInt(skip)).limit(parseInt(limit)).exec()
            if(!customers) return res.status(404).send({ status: "error", message: "Could not get customers." })
            let count = 0
            count = await Customer.find(where).countDocuments()

            res.send({ status: "success", message: "Customer list obtained successfully.", result: customers, count })
        } catch (e) {
            res.status(500).send({ status: "error", message: "Internal server error." })
        }
    },

    // Get Single Customer
    selectCustomerById: async function (req, res) {
        try {            
            if(!req.body.id || req.body.id == "") return res.status(404).send({ status: "error", message: "Could not get customer." })            
            let address = await Address.findOne({ customerId: req.body.id }).populate('customerId')
            if(!address) return res.status(404).send({ status: "error", message: "Could not get customer." })

            res.send({ status: "success", message: "Customer obtained successfully.", result: address.customerId, address })
        } catch (e) {
            res.status(500).send({ status: "error", message: "Internal server error." })
        }
    },

    // Add Customer and Address
    insertCustomer: async function (req, res) {
        try {
            let where = { userName: req.body.customer.email }
            let customer = await Customer.findOne(where)
            if(customer) return res.status(409).send({ status: "error", message: "Email already exists." });

            let customerData = new Customer(req.body.customer)
            let savedCustomer = await customerData.save();
            if(!savedCustomer) return res.status(500).send({ status: "error", message: "Unable to save customer." });

            req.body.address.customerId = savedCustomer._id
            let addressData = new Address(req.body.address)
            let savedAddress = await addressData.save();
            if(!savedAddress) return res.status(500).send({ status: "error", message: "Unable to save address." });

            res.send({ status: "success", message: "Customer saved successfully.", result: savedCustomer });
        } catch (e) {
            console.log(e);
            res.status(500).send({ status: "error", message: "Internal server error." })
        }
    },

    // Update Customer and Address
    updateCustomer: async function (req, res) {
        try {
            let where = { _id: req.body.id }
            let customer = await Customer.findOne(where)
            if(!customer) return res.status(404).send({ status: "error", message: "Customer not found." });

            let newCustomer = await Customer.findOneAndUpdate({ _id: req.body.id }, { $set: req.body.customer }, {
                new: true,
                useFindAndModify: false,
                upsert: false
            })

            await Address.findOneAndUpdate({ customerId: req.body.id }, { $set: req.body.address }, {
                new: true,
                useFindAndModify: false,
                upsert: false
            })

            res.send({ status: "success", message: "Customer saved successfully.", result: newCustomer });
        } catch (e) {
            res.status(500).send({ status: "error", message: "Internal server error." })
        }
    },

    // Delete Customer and Address
    deleteCustomer: async function (req, res) {
        try {
            await Customer.deleteOne({ _id: req.body.id })
            await Address.deleteOne({ customerId: req.body.id })
            res.status(200).send({ status: "success", message: "Deleted customer successfully." });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Internal server error." })
        }
    },
};
