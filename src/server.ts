import dotenv from 'dotenv';
// Loads environment variables from a .env file 
dotenv.config();
import app from './app';

const PORT = process.env.PORT || 5001;

// Starts the server and listens for connections on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
