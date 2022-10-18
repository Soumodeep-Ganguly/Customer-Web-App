const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers",
            default: null,
        },
        address: {
            type: String,
            default: "",
        },
        landmark: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        state: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        zipCode: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.address || mongoose.model("address", AddressSchema);