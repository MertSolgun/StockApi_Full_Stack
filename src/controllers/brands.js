const brandsSchema = require("../models/brands");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "List Brands"
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
    const data = await res.getModelList(brandsSchema);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(brandsSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Create Brand"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Brand 1"
                }
            }
        */

    const data = await brandsSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Get Single Brand"
        */

    if (req.params?.id) {
      const data = await brandsSchema.findOne({ _id: req.params.id });
      res.status(200).send({
        error: false,
        data,
      });
    } else {
      //all
      const data = await res.getModelList(brandsSchema);
      res.status(200).send({
        error: false,
        data,
        details: await res.getModelListDetails(brandsSchema),
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Update Brand"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Brand 1"
                }
            }
        */
    const data = await brandsSchema.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    res.status(200).send({
      error: false,
      data,
      newData: await brandsSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Delete Brand"
        */
    const data = await brandsSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
