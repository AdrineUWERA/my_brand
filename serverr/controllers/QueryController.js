import QueryService from "../services/query.service.js";
import Query from '../models/Query.js'

const GetAllQueries = async (req, res) => {
  const queries = await QueryService.findAll();
  try {
    res.send({ message: "All queries", data: queries });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: `Error: ${err}`,
    });
  }
};

const CreateQuery = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const newquery = await QueryService.createQuery({
      fullName: fullName,
      email: email,
      message: message,
    });

    const querySent = await newquery.save();

    res.status(201).json({
      message: "New query sent successfully!",
      data: querySent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

const deleteQuery = (req, res) => {
  const deletedQuery =  Query.deleteOne({_id: req.params.id});
  return res.status(200).json({
    message: "Query deleted!"
  })
}

export { GetAllQueries, CreateQuery, deleteQuery };
