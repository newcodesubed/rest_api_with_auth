import { createUser, getUserByEmail } from "../db/users";
import { Request, Response } from "express";
import { authentication, random } from "../helpers/index.helper";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in register controller", error);
    return res.sendStatus(400);
  }
};
