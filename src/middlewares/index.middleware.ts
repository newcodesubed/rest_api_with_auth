import { getUserBySessionToken } from "../db/users";
import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

export const isOwner = async (req: Request, res: Response, next: NextFunction) =>{
  const {id}= req.params;
  const currentUserId = get(req, 'identity._id') as string;
  if(!currentUserId){
    return res.sendStatus(403);

  }

  if(currentUserId.toString() !== id){
    return res.sendStatus(403);
  }

  next();
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = req.cookies["SUBED-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
