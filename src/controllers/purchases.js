const purchasesSchema = require("../models/purchases");

const product = require("../models/products");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(purchasesSchema, {}, [
      { path: "userId", select: "username email" },
      { path: "firmId", select: "name image" },
      "brandId",
      { path: "productId", select: "name", populate: { path: "categoryId" } },
    ]);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(purchasesSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Purchase 1"
                }
            }
        */
    req.body.userId = req.user._id;

    const data = await purchasesSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });

    await product.updateOne(
      { _id: req.body.productId },
      { $inc: { quantity: +req.body.quantity } }
    );
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchase"
        */

    if (req.params?.id) {
      const data = await purchasesSchema
        .findOne({ _id: req.params.id })
        .populate([
          { path: "userId", select: "username email" },
          { path: "firmId", select: "name image" },
          "brandId",
          {
            path: "productId",
            select: "name",
            populate: { path: "categoryId" },
          },
        ]);
      res.status(200).send({
        error: false,
        data,
      });
    } else {
      //all
      const data = await res.getModelList(purchasesSchema, {}, [
        { path: "userId", select: "username email" },
        { path: "firmId", select: "name image" },
        "brandId",
        { path: "productId", select: "name", populate: { path: "categoryId" } }, //!important
      ]);
      res.status(200).send({
        error: false,
        data,
        details: await res.getModelListDetails(purchasesSchema),
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Purchase 1"
                }
            }
        */

    if (req.body?.quantity) {
      const currentPurchases = await purchasesSchema.findOne({
        _id: req.params.id,
      });

      const difference = req.body.quantity - currentPurchases.quantity;

      const updateProduct = await product.updateOne(
        {
          _id: currentPurchases.productId,
        },
        { $inc: { quantity: +difference } }
      );
    }

    const data = await purchasesSchema.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );
    res.status(200).send({
      error: false,
      data,
      newData: await purchasesSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchase"
        */

    const currentPurchases = await purchasesSchema.findOne({
      _id: req.params.id,
    });

    const data = await purchasesSchema.deleteOne({ _id: req.params.id });

    const updateProduct = await product.updateOne(
      {
        _id: currentPurchases.productId,
      },
      { $inc: { quantity: -currentPurchases.quantity } }
    );

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
