import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import categories from './routes/categories.js'
import productRoutes from './routes/products.js'

const app = express();


const CONNECTION_URL="mongodb+srv://<username>:<password>@cluster0.rcfcle1.mongodb.net/?retryWrites=true&w=majority"
const PORT=5000;

app.use(bodyParser.json());

//routes
app.use('/categories',categories);
app.use('/products',productRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on PORT:${PORT}`)))
    .catch((error) => console.log(error.message)) 


