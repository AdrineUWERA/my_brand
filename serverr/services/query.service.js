import Query from "../models/Query.js";

class QueryService {
    static createQuery =  async (data) => {
        const queryCreated = await Query.create(data);
        return await queryCreated.save()
    }

    static findAll = async () => {
        return await Query.find()
    }
}

export default QueryService;