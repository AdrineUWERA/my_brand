import QueryService from "../services/query.service.js";

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

export { GetAllQueries, CreateQuery };
