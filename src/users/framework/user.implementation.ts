import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../shared/env";
import type UserRepository from "../domain/user.repository";
import type userEntity from "../entity/user.entity";
import UserDB from "./user.db";

export default class UserImplementation implements UserRepository {
  private userDB = UserDB;

  async userExists(email: string): Promise<boolean> {
    const user = await this.userDB.query().findOne({ email });
    return user ? true : false;
  }

  async createUser(user: userEntity): Promise<userEntity> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userDB.query().insert(user);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userDB.query().findOne({
      email,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error("Wrong credentials");
    }
    return {
      accessToken: jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + env.expirationAccessToken * 60,
          id: user.id,
        },
        env.passphrase
      ),
      refreshToken: jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + env.expirationRefreshToken * 60,
          id: user.id,
        },
        env.passphrase
      ),
    };
  }
}
