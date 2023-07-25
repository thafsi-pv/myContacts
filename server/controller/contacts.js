const mongoose = require("mongoose");
const contactModel = require("../model/contactModel");
const contactNumberModel = require("../model/contactNumberModel");

const getAllContacts = async (req, res) => {
  try {
    const contactList = await contactModel
      .find({})
      .sort({ firstName: 1 })
      .populate("department")
      .populate("designation")
      .populate("contactNos", "-_id -__v");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllContactsGroup = async (req, res) => {
  try {
    const { name, designationId, departmentId, page, pageSize } = req.query;
    const currentPage = parseInt(page) || 1;
    const contactsPerPage = parseInt(pageSize) || 10;

    // Calculate the skip count based on the current page and contacts per page
    const skipCount = (currentPage - 1) * contactsPerPage;

    // Create an empty filter object to hold the query conditions
    const filter = {};

    // If name is provided, add it to the filter to check both firstName and lastName
    if (name) {
      filter.$or = [
        { "contacts.firstName": { $regex: new RegExp(name, "i") } },
        { "contacts.lastName": { $regex: new RegExp(name, "i") } },
      ];
    }

    // If designationId is provided, add it to the filter
    if (designationId) {
      filter["contacts.designation._id"] = new mongoose.Types.ObjectId(designationId);
    }

    // If departmentId is provided, add it to the filter
    if (departmentId) {
      filter["contacts.department._id"] = new mongoose.Types.ObjectId(departmentId);
    }

    // Use the filter in the $match stage of the aggregation pipeline
    const contactList = await contactModel.aggregate([
      {
        $sort: { firstName: 1 }, // Sort contacts by firstName in ascending order (A to Z)
      },
      {
        $unwind: "$contacts", // Unwind the contacts array to prepare for $lookup stages
      },
      {
        $match: filter, // Apply the filter to the aggregation pipeline
      },
      {
        $addFields: {
          firstLetterLower: { $toLower: { $substr: ["$contacts.firstName", 0, 1] } }, // Create a new field with the lowercase version of the first letter
        },
      },
      {
        $group: {
          _id: "$firstLetterLower", // Group contacts by the new field
          contacts: { $push: "$contacts" }, // Push the entire contact document into the contacts array
        },
      },
      {
        $sort: { _id: 1 }, // Sort the groups based on the first letter in ascending order (A to Z)
      },
      {
        $skip: skipCount, // Add the $skip stage to skip contacts on previous pages
      },
      {
        $limit: contactsPerPage, // Add the $limit stage to limit contacts per page
      },
    ]);

    const totalCount = await contactModel.countDocuments(filter); // Get the total count based on the filter

    res.json({ contactList, totalCount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// const getAllContactsGroup = async (req, res) => {
//   try {
//     const { name, designationId, departmentId } = req.query;

//     // Create an empty filter object to hold the query conditions
//     const filter = {};

//     // If name is provided, add it to the filter to check both firstName and lastName
//     if (name) {
//       filter.$or = [
//         { "contacts.firstName": { $regex: new RegExp(name, "i") } },
//         { "contacts.lastName": { $regex: new RegExp(name, "i") } },
//       ];
//     }

//     // If designationId is provided, add it to the filter
//     if (designationId) {
//       filter["contacts.designation._id"] = new mongoose.Types.ObjectId(
//         designationId
//       );
//     }

//     // If departmentId is provided, add it to the filter
//     if (departmentId) {
//       filter["contacts.department._id"] = new mongoose.Types.ObjectId(
//         departmentId
//       );
//     }

//     // Use the filter in the $match stage of the aggregation pipeline
//     const contactList = await contactModel.aggregate([
//       {
//         $sort: { firstName: 1 }, // Sort contacts by firstName in ascending order (A to Z)
//       },
//       {
//         $group: {
//           _id: { $substr: ["$firstName", 0, 1] }, // Group contacts by the first letter of firstName
//           contacts: { $push: "$$ROOT" }, // Push the entire contact document into the contacts array
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort the groups based on the first letter in ascending order (A to Z)
//       },
//       {
//         $unwind: "$contacts", // Unwind the contacts array to prepare for $lookup stages
//       },
//       {
//         $lookup: {
//           from: "departments", // Replace "departments" with the actual collection name for departments
//           localField: "contacts.department",
//           foreignField: "_id",
//           as: "contacts.department",
//         },
//       },
//       {
//         $lookup: {
//           from: "designations", // Replace "designations" with the actual collection name for designations
//           localField: "contacts.designation",
//           foreignField: "_id",
//           as: "contacts.designation",
//         },
//       },
//       {
//         $lookup: {
//           from: "contactnumbers", // Replace "contactNos" with the actual collection name for contactNos
//           localField: "contacts.contactNos",
//           foreignField: "_id",
//           as: "contacts.contactNos",
//         },
//       },
//       {
//         $match: filter, // Apply the filter to the aggregation pipeline
//       },
//       {
//         $group: {
//           _id: "$_id",
//           contacts: { $push: "$contacts" }, // Push the contacts back into the contacts array for each group
//         },
//       },
//     ]);

//     const totalCount = await contactModel.countDocuments(filter); // Get the total count based on the filter

//     contactList.sort((a, b) => a._id.localeCompare(b._id));
//     res.json({ contactList, totalCount });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getAllContactsGroup = async (req, res) => {
//   try {
//     const contactList = await contactModel.aggregate([
//       {
//         $sort: { firstName: 1 }, // Sort contacts by firstName in ascending order (A to Z)
//       },
//       {
//         $group: {
//           _id: { $substr: ["$firstName", 0, 1] }, // Group contacts by the first letter of firstName
//           contacts: { $push: "$$ROOT" }, // Push the entire contact document into the contacts array
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort the groups based on the first letter in ascending order (A to Z)
//       },
//       {
//         $unwind: "$contacts", // Unwind the contacts array to prepare for $lookup stages
//       },
//       {
//         $lookup: {
//           from: "departments", // Replace "departments" with the actual collection name for departments
//           localField: "contacts.department",
//           foreignField: "_id",
//           as: "contacts.department",
//         },
//       },
//       {
//         $lookup: {
//           from: "designations", // Replace "designations" with the actual collection name for designations
//           localField: "contacts.designation",
//           foreignField: "_id",
//           as: "contacts.designation",
//         },
//       },
//       {
//         $lookup: {
//           from: "contactnumbers", // Replace "contactNos" with the actual collection name for contactNos
//           localField: "contacts.contactNos",
//           foreignField: "_id",
//           as: "contacts.contactNos",
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           contacts: { $push: "$contacts" }, // Push the contacts back into the contacts array for each group
//         },
//       },
//     ]);
//     const totalCount = await contactModel.countDocuments();
//     contactList.sort((a, b) => a._id.localeCompare(b._id));
//     res.json({contactList,totalCount});
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getAllContactsGroup = async (req, res) => {
//   try {
//     const contactList = await contactModel.aggregate([
//       {
//         $sort: { firstName: 1 }, // Sort contacts by firstName in ascending order (A to Z)
//       },
//       {
//         $group: {
//           _id: { $substr: ["$firstName", 0, 1] }, // Group contacts by the first letter of firstName
//           contacts: {
//             $push: {
//               firstName: "$firstName",
//               lastName: "$lastName",
//               department: "$department",
//               designation: "$designation",
//               contactNos: "$contactNos",
//             },
//           },
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort the groups based on the first letter in ascending order (A to Z)
//       },
//     ]);
//     console.log("🚀 ~ file: contacts.js:41 ~ getAllContacts ~ contactList:", contactList)

//     res.json(contactList);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const contactGetById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("🚀 ~ file: contacts.js:19 ~ contactGetById ~ id:", id);
    const contactList = await contactModel
      .find({ _id: id })
      .populate("department")
      .populate("contactNos", "-_id -__v");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addOrUpdateContact = async (req, res) => {
  try {
    const { newContact, contactNos } = req.body;

    if (newContact?._id != 0) {
    }
    const numbers = await contactNumberModel.create(contactNos);
    newContact.contactNos = numbers._id;
    const data = await contactModel.create(newContact);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  contactGetById,
  addOrUpdateContact,
  getAllContactsGroup,
};
