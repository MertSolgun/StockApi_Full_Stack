const productSchema = require("../models/products");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
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
    const data = await res.getModelList(productSchema, {}, [
      "categoryId",
      "brandId",
    ]);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(productSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Product 1"
                }
            }
        */
    const data = await productSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */

    if (req.params?.id) {
      const data = await productSchema
        .findOne({ _id: req.params.id })
        .populate(["categoryId", "brandId"]);
      res.status(200).send({
        error: false,
        data,
      });
    } else {
      const data = await res.getModelList(productSchema, {}, [
        "categoryId",
        "brandId",
      ]);
      res.status(200).send({
        error: false,
        data,
        details: await res.getModelListDetails(productSchema),
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Product 1"
                }
            }
        */
    const data = await productSchema.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );
    res.status(200).send({
      error: false,
      data,
      newData: await productSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Delete Product"
        */
    const data = await productSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
