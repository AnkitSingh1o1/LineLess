import express from 'express';
import router from './router';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
