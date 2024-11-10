const Journey = require("../../models/Journey.models.js");

const deleteJourney = async (req, res) => {
  const userId = req?.user?._id;
  const journeyId = req.body?.id;

  try {
    if (!journeyId) {
      throw new Error(400, "data insufficient to delete journey");
    }

    const journeyInDb = await Journey.findById(journeyId);

    if (!journeyInDb) {
      throw new Error(400, "journey not found in DB");
    }
    

    if (journeyInDb?.userId?.toString() !== userId?.toString()) {
      console.log('journeyInDb?.userId', journeyInDb?.userId)
      console.log('userId',userId)
      throw new Error(400, "user not authorised to delete this journey");
    }

   
    await Journey.findByIdAndDelete(journeyId);
    


    res.status(200).json({ message: "journey successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteJourney;
