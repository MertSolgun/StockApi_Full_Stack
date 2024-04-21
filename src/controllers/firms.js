const firmsSchema = require("../models/firms");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "List Firms"
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
    const data = await res.getModelList(firmsSchema);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(firmsSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Create Firm"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Firm 1"
                }
            }
        */
    const data = await firmsSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Get Single Firm"
        */
    if (req.params?.id) {
      const data = await firmsSchema.findOne({ _id: req.params.id });
      res.status(200).send({
        error: false,
        data,
      });
    } else {
      //all
      const data = await res.getModelList(firmsSchema);
      res.status(200).send({
        error: false,
        data,
        details: await res.getModelListDetails(firmsSchema),
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Update Firm"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Firm 1"
                }
            }
        */
    const data = await firmsSchema.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(200).send({
      error: false,
      data,
      newData: await firmsSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Delete Firm"
        */

    const data = await firmsSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
