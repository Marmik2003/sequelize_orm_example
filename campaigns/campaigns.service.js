const db = require("_helpers/db");

module.exports = {
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignByUserId,
};

async function createCampaign(params) {
    const campaign = new db.Campaign(params);
    await campaign.save();
}

async function updateCampaign(id, params) {
    const campaign = await getCampaign(id);
    Object.assign(campaign, params);
    await campaign.save();
}

async function deleteCampaign(id) {
    const campaign = await getCampaign(id);
    Object.assign(campaign, { deletedDate: new Date() });
    await campaign.save();
}

async function getAllCampaigns() {
    return await db.Campaign.findAll({
        where: { deletedDate: null },
        include: [{ model: db.User, as: "User" }],
    });
}

async function getCampaignByUserId(userId) {
  const campaign = await db.Campaign.findAll({
    where: { userId, deletedDate: null },
  });
  if (!campaign) throw "Campaign not found";
  return campaign;
}

async function getCampaignById(id) {
  const campaign = await db.Campaign.findOne({
      where: { id, deletedDate: null },
      include: [{ model: db.User, as: "User" }],
      });
  if (!campaign) throw "Campaign not found";
  return campaign;
}
