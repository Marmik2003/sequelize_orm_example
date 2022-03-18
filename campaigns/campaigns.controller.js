const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const campaignsService = require("./campaigns.service");

// routes
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.get("/:userId", getCampaignByUserId);
router.post("/", createCampaignSchema, createCampaign);
router.put("/:id", updateCampaignSchema, updateCampaign);
router.delete("/:id", deleteCampaign);

module.exports = router;

// route functions

function createCampaign(req, res, next) {
  campaignsService
    .createCampaign(req.body)
    .then((campaign) => res.json({ message: "Campaign created" }))
    .catch(next);
}

function updateCampaign(req, res, next) {
  campaignsService
    .updateCampaign(req.params.id, req.body)
    .then(() => res.json({ message: "Campaign updated" }))
    .catch(next);
}

function deleteCampaign(req, res, next) {
  campaignsService
    .deleteCampaign(req.params.id)
    .then(() => res.json({ message: "Campaign deleted" }))
    .catch(next);
}

function getAllCampaigns(req, res, next) {
  campaignsService
    .getAllCampaigns()
    .then((campaigns) => res.json(campaigns))
    .catch(next);
}

function getCampaignById(req, res, next) {
  campaignsService
    .getCampaignById(req.params.id)
    .then((campaign) => res.json(campaign))
    .catch(next);
}

function getCampaignByUserId(req, res, next) {
  campaignsService
    .getCampaignByUserId(req.params.userId)
    .then((campaign) => res.json(campaign))
    .catch(next);
}


// schema functions
function createCampaignSchema(req, res, next) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateCampaignSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
