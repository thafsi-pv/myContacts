const departmentModal = require("../model/departmentModel");

const getAllDepartment = async (req, res) => {
  try {
    const dept = await departmentModal.find({});
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addOrUpdateDepartment = async (req, res) => {
  try {
    let updatedDept;
    const { newDept } = req.body;
    if (newDept.id != 0) {
      updatedDept = await departmentModal.findByIdAndUpdate(
        newDept.id,
        newDept,
        { new: true }
      );
    } else {
      const isExist = await departmentModal.findOne({ name: newDept.name });
      if (!!isExist == true) {
        return res.status(409).json({
          isExist: true,
          message: `${isExist.name} department already exists!`,
        });
      }
      updatedDept = await departmentModal.create(newDept);
    }

    res.json(updatedDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllDepartment, addOrUpdateDepartment };
