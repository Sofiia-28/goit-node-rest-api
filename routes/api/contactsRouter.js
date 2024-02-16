const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../../schemas");
const { validateBody } = require("../../helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = contactsRouter;
