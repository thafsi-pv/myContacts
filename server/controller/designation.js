const designationModal = require("../model/designationModel");

const getAllDesignation = async (req, res) => {
  try {
    const Designation = await designationModal.find({});
    res.json(Designation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addOrUpdateDesignation = async (req, res) => {
  try {
    let updatedDesignation;
    const { newDesignation } = req.body;
    if (newDesignation.id != 0) {
      updatedDesignation = await designationModal.findByIdAndUpdate(
        newDesignation.id,
        newDesignation,
        { new: true }
      );
    } else {
      const isExist = await designationModal.findOne({ name: newDesignation.name });
      if (!!isExist == true) {
        return res.status(409).json({
          isExist: true,
          message: `${isExist.name} designation already exists!`,
        });
      }
      updatedDesignation = await designationModal.create(newDesignation);
    }

    res.json(updatedDesignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDesignationById = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await designationModal.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllDesignation,
  addOrUpdateDesignation,
  deleteDesignationById,
};
