const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new

mongoose
	.connect("mongodb://localhost:27017/blogPosts", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json()) 
		app.use("/api", routes) // new

		app.listen(5001, () => {
			console.log("Server has started!")
		})
	})