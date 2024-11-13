import express from "express";

import { UserService } from "../prisma/UserService.js";

const SearchController = express.Router();

SearchController.post("/", async (req, res) => {
  const { input } = req.body;

  const result = await UserService.findAllUsersByLogin({
    input,
  });

  res.json(result);
});

export default SearchController;
