import { Schema } from "mongoose";

export default {
  name: "Profile",
  schema: new Schema(
    {
      accountname: {
        type: String,
        required: [true, "Account Name is required."],
      },
      fname: {
        type: String,
        required: false,
      },
      lname: {
        type: String,
        required: false,
      },
      mname: {
        type: String,
        required: false,
      },
      bday: {
        type: Date,
        required: false,
      },
      memdate: {
        type: Date,
        required: false,
      },
      acctstat: {
        type: Number,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      gender: {
        type: Number,
        required: false,
      },
      civilstat: {
        type: Number,
        required: false,
      },
      remarks: {
        type: String,
        required: false,
      },
      proftype: {
        type: Number,
        required: false,
      },
      profgroup: {
        type: Number,
        required: false,
      },
      previd: {
        type: String,
        required: false,
      },
      billcity: {
        type: String,
        required: false,
      },
      shipcity: {
        type: String,
        required: false,
      },
      area: {
        type: String,
        required: false,
      },
      kobid: {
        type: String,
        required: false,
      },
      salesperson: {
        type: String,
        required: false,
      },
      clientgroupid: {
        type: Number,
        required: false,
      },
      pricecodeid: {
        type: Number,
        required: false,
      },
      shipperid: {
        type: Number,
        required: false,
      },
      hasbranches: {
        type: Boolean,
        required: false,
      },
      tin: {
        type: String,
        required: false,
      },

      createdBy: {
        type: String,
        required: [true, "Created by is required."],
      },
      editedBy: {
        type: String,
        required: [true, "Edited by is required."],
      },
    },
    {
      timestamps: true,
    }
  ),
};
