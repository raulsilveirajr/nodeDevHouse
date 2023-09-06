import Booking from "../models/Booking.js";
import House from "../models/House.js";

class BookingController {
  async index(req, res) {
    const { user_id: userId } = req.headers;

    try {
      const bookings = await Booking.find({ user: userId }).populate(["house"]);

      return res.json(bookings);
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async store(req, res) {
    const { user_id: userId } = req.headers;
    const { house_id: houseId } = req.params;
    const { date } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Error - User_id is mandatory." });
    }

    if (!date) {
      return res.status(400).json({ message: "Error - Date is mandatory." });
    }

    try {
      const houseOrdered = await House.findById(houseId);

      if (!houseOrdered) {
        return res
          .status(404)
          .json({ message: `Error - House not found. (${houseId})` });
      }

      if (houseOrdered.status !== true) {
        return res
          .status(400)
          .json({ message: "Error - House isn't avaliable." });
      }

      if (String(houseOrdered.user) === String(userId)) {
        return res
          .status(401)
          .json({ message: "Error - User_id is the house's owner." });
      }

      const booking = await Booking.create({
        user: userId,
        house: houseId,
        date,
      });

      await booking.populate(["house", "user"]);

      return res.json({ message: "Booking saved.", data: booking });
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { user_id: userId } = req.headers;

    if (!userId) {
      return res.status(400).json({ message: "Error - User_id is mandatory." });
    }

    try {
      const booking = await Booking.findById(id);

      if (!booking) {
        return res.status(404).json({ message: `ID not found - ${id}` });
      }

      if (String(booking.user) !== String(userId)) {
        return res.status(401).json({ message: "Unauthorized user_id" });
      }

      await Booking.deleteOne(booking);

      return res.json({ message: "Booking deleted.", id });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal error.", data: String(error) });
    }
  }
}

export default new BookingController();
