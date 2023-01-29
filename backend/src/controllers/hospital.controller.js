exports.addPatient = async (req, res) => {
  const data = req.body;
  //split data into elements and their values, like name, age, etc
  //then add them to the database

  elements = Object.keys(data);
  values = Object.values(data);
  console.log(elements);

  console.log(data);
  res.status(200).json({
    message: "Patient Added Successfully",
  });
};
