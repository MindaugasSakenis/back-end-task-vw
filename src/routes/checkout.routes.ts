import { Request, Response, Router } from "express";
import * as Joi from "joi";
import { checkoutSchema, updateSchema } from "../joiSchemas";
import { CheckoutData } from "../types";

const router = Router();

const dataStore: CheckoutData[] = [];

router.get("/checkout/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const data = dataStore.find((item) => item.id === id);
  if (!data) {
    return res.status(404).json({ message: "Data not found" });
  }

  const msg = {
    status: "200 OK",
    message: data,
  };
  res.json(msg);
});

router.post("/checkout", (req: Request & { body: CheckoutData }, res: Response) => {
  const { error }: Joi.ValidationResult = checkoutSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // random string as id
  const id: string = `id556${Date.now()}`;

  const { companyData } = req.body;

  dataStore.push({ id, companyData });

  const msg = {
    status: "200 OK",
    message: `Data created with ID ${id}`,
    data: { id, companyData },
  };
  res.json(msg);
});

router.put("/checkout/:id", (req: Request & { body: CheckoutData }, res: Response) => {
  const { error }: Joi.ValidationResult = updateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { id } = req.params;

  const dataObject: CheckoutData | undefined = dataStore.find((obj) => obj.id === id);

  if (!dataObject) {
    return res.status(404).json({ error: `Data object with ID ${id} not found` });
  }

  const { customerData } = req.body;

  dataObject.customerData = { ...dataObject.customerData, ...customerData };

  const msg = {
    status: "200 OK",
    message: `Data object with ID ${id} updated successfully`,
    data: dataObject,
  };
  res.json(msg);
});

export { router };
