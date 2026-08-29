CREATE OR REPLACE VIEW "order_details" AS
SELECT
  o."id" AS "orderId",
  o."companyId",
  c."companyName",
  c."contactEmail" AS "email",
  c."contactEmail" AS "companyEmail",
  c."contactName",
  c."contactEmail",
  c."contactPhone",
  c."website",
  o."plan",
  o."basePrice",
  o."addOnPrice",
  o."totalPrice" AS "setupPrice",
  o."monthlyPrice",
  o."paymentStatus",
  o."orderStatus",
  o."deliveryDate",
  o."notes" AS "orderNotes",
  cc."botName",
  cc."botPurpose",
  cc."requirements",
  cc."botpressStatus",
  cc."botpressBotId",
  cc."botpressProductionUrl",
  o."createdAt",
  o."updatedAt"
FROM "orders" o
JOIN "company" c ON c."id" = o."companyId"
LEFT JOIN "chatbot_configuration" cc ON cc."orderId" = o."id";
