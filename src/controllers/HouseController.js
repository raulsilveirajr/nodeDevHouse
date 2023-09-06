import * as yup from "yup";
import House from "../models/House.js";

yup.setLocale({
  mixed: {
    default: "Is invalid",
  },
  number: {
    min: "Should be bigger than ${min}",
  },
});

const schema = yup.object({
  description: yup.string().required(),
  price: yup.number().required(),
  location: yup.string().required(),
  status: yup.boolean().required(),
});

class HouseController {
  async index(req, res) {
    try {
      const { status } = req.query;
      const { user_id: userId } = req.headers;
      const filters = {};

      if (status) {
        filters.status = String(status);
      }

      if (userId) {
        filters.user = String(userId);
      }

      if (!filters.status && !filters.user) {
        return res
          .status(400)
          .json({ message: "Error - Status or user_id should be sent." });
      }

      const houses = await House.find(filters);
      return res.json({ data: houses });
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id: userId } = req.headers;

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        error: "Internal error.",
        message: err.name,
        errors: err.errors,
      });
    }

    try {
      const house = await House.create({
        user: userId,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      });

      return res.json({ message: "House saved.", data: house });
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async get(req, res) {
    const { id } = req.params;
    const { user_id: userId } = req.headers;

    try {
      const house = await House.findById(id);

      if (!house) {
        return res.status(404).json({ message: `ID not found - ${id}` });
      }

      if (String(house.user) !== String(userId)) {
        return res.status(401).json({ message: "Unauthorized user_id" });
      }

      return res.json(house);
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const { user_id: userId } = req.headers;

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        error: "Internal error.",
        message: err.name,
        errors: err.errors,
      });
    }

    try {
      const house = await House.findById(id);

      if (!house) {
        return res.status(404).json({ message: `ID not found - ${id}` });
      }

      if (String(house.user) !== String(userId)) {
        return res.status(401).json({ message: "Unauthorized user_id" });
      }

      Object.keys(req.body).forEach((field) => {
        house[field] = req.body[field];
      });
      house.thumbnail = filename;

      await house.save();

      return res.json({ message: "House updated.", data: house });
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }

  async delete(req, res) {
    const { id } = req.body;
    const { user_id: userId } = req.headers;

    try {
      const house = await House.findById(id);

      if (!house) {
        return res.status(404).json({ message: `ID not found - ${id}` });
      }

      if (String(house.user) !== String(userId)) {
        return res.status(401).json({ message: "Unauthorized user_id" });
      }

      await House.deleteOne(house);

      return res.json({ message: "House deleted.", id });
    } catch (error) {
      return res.status(500).json({ error: "Internal error.", data: error });
    }
  }
}

export default new HouseController();
