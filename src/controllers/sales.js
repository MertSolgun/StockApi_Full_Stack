const salesSchema = require("../models/sales");

const product = require("../models/products");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
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
    const data = await res.getModelList(salesSchema, {}, [
      { path: "userId", select: "username email" },
      { path: "brandId", select: "name image" },
      { path: "productId", select: "name", populate: { path: "categoryId" } }, //!important
    ]);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(salesSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Sale 1"
                }
            }
        */
    req.body.userId = req.user._id;

    const currentProduct = await product.findOne({ _id: req.body.productId });

    if (currentProduct.quantity >= req.body.quantity) {
      const data = await salesSchema.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });

      const updateProduct = await product.updateOne(
        { _id: req.body.productId },
        { $inc: { quantity: -req.body.quantity } }
      );
    } else {
      res.errorStatusCode = 422;
      throw new Error("There is not enough prodouct-quantity for this sale");
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */
    if (req.params?.id) {
      const data = await salesSchema.findOne({ _id: req.params.id }).populate([
        { path: "userId", select: "username email" },
        { path: "brandId", select: "name image" },
        { path: "productId", select: "name", populate: { path: "categoryId" } }, //!important
      ]);
      res.status(200).send({
        error: false,
        data,
      });
    } else {
      //all
      const data = await res.getModelList(salesSchema, {}, [
        { path: "userId", select: "username email" },
        { path: "brandId", select: "name image" },
        { path: "productId", select: "name", populate: { path: "categoryId" } }, //!important
      ]);
      res.status(200).send({
        error: false,
        data,
        details: await res.getModelListDetails(salesSchema),
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Sale 1"
                }
            }
        */
    if (req.body?.quantity) {
      const currentSale = await salesSchema.findOne({ _id: req.params.id });

      const difference = req.body.quantity - currentSale.quantity; //(satisi yapilmis urunlerin miktari)

      const updateProduct = await product.updateOne(
        { _id: currentSale.productId, quantity: { $gte: difference } },
        { $inc: { quantity: -difference } }
      );

      if (updateProduct.modifiedCount === 0) {
        res.errorStatusCode = 422;
        throw new Error("There is not enough product-quantity for this sale");
      }
    }

    const data = await salesSchema.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(200).send({
      error: false,
      data,
      newData: await salesSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sale"
        */

    const currentSale = await salesSchema.findOne({ _id: req.params.id });

    const data = await salesSchema.deleteOne({ _id: req.params.id });

    const updateProduct = await product.updateOne(
      { _id: currentSale.productId },
      { $inc: { quantity: +currentSale.quantity } }
    );

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
