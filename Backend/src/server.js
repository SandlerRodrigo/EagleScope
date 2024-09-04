const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../Frontend/build')));

// Serve the frontend's index.html for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/build', 'index.html'));
});