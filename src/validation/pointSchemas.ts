import { z } from "zod";

export const filterPointsSchema = z.object({
  city: z.string(),
  uf: z.string().length(2),
  items: z.string().transform((val) => val.split(",").map((id) => Number(id.trim()))),
});

export const createPointSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  city: z.string(),
  uf: z.string().length(2),
  items: z.array(z.number()),
});
