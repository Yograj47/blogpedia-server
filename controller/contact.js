const contact = require("../model/contact");

async function createContact(req, res) {
  try {
    const contactData = await contact.create(req.body);
    res.status(201).json({
      success: true,
      data: contactData,
      message: "Contact created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

module.exports = {
  createContact,
};
