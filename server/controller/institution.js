const InstitutionModal = require("../model/institutionModel");

const getAllInstitution = async (req, res) => {
  try {
    const dept = await InstitutionModal.find({});
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addOrUpdateInstitution = async (req, res) => {
  console.log("🚀 ~ file: institution.js:13 ~ addOrUpdateInstitution ~ req:", req)
  try {
    let updatedInstitution;
    const { newInstitution } = req.body;
    if (newInstitution.id != 0) {
      updatedInstitution = await InstitutionModal.findByIdAndUpdate(
        newInstitution.id,
        newInstitution,
        { new: true }
      );
    } else {
      const isExist = await InstitutionModal.findOne({ name: newInstitution.name });
      if (!!isExist == true) {
        return res.status(409).json({
          isExist: true,
          message: `${isExist.name} Institution already exists!`,
        });
      }
      updatedInstitution = await InstitutionModal.create(newInstitution);
    }

    res.json(updatedInstitution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInstitutionById = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await InstitutionModal.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllInstitution,
  addOrUpdateInstitution,
  deleteInstitutionById,
};
