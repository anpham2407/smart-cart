var express = require("express");
var router = express.Router();
import vCard from "vcards-js";

import { ErrUserNotExist } from "../core/error";
import * as UserService from "../services/user";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* GET user by UID */
router.get("/:identifier", async (req, res, next) => {
  try {
    const { identifier } = req.params;

    // UID = unique ID - generated when we write a new Card for customer
    // from this UID, we can find coresponding profile
    // then redirect them to /username link
    const user = await UserService.getUser(identifier);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* POST new user */
router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await UserService.create(payload);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:uid/block", async (req, res, next) => {
  const { uid } = req.params;
  try {
    const user = await UserService.updateByUID(uid, { isBlock: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* PUT update user profile */
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const currentUser = await UserService.getById(id);
    if (!currentUser) {
      throw ErrUserNotExist;
    }

    // payload need validation
    const updateUserPayload = req.body;
    const updatedUser = await UserService.updateUserProfile(
      id,
      updateUserPayload
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/* PUT update user profile */
router.get("/:id/vcard", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.getById(id);
    if (!user) {
      throw ErrUserNotExist;
    }

    const vcard = new vCard();
    vcard.firstName = user.fullName;
    vcard.workPhone = user.phone;

    // const filename = `${String(user.fullName).replace(' ', '')}.vcf`;
    const filename = `vcard.touchshare.vcf`;

    //set content-type and disposition including desired filename
    res.set("Content-Type", `text/vcard; name="${filename}"`);
    res.set("Content-Disposition", `inline; filename="${filename}"`);

    res.send(vcard.getFormattedString());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
