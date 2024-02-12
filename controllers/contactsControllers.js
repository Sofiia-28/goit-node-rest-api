const path = require("path");
const contactsServicesPath = path.resolve(
  __dirname,
  "../services/contactsServices"
);
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require(contactsServicesPath);
const HttpError = require("../helpers/HttpError");
const _ = require("lodash");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    const result = await updateContactById({ id, name, email, phone });
    if (_.isEmpty(req.body)) {
      throw HttpError(400, "Body must have at least one field");
    }
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
