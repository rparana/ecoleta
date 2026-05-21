import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3333",
  port: process.env.PORT || 3333,
  
  resolveImageUrl(image: string) {
    return `${this.baseUrl}/uploads/${image}`;
  }
};
