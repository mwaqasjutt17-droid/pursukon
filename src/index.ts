import 'dotenv/config';
import app from './server/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Frontend:  http://localhost:${PORT}/index.html`);
    console.log(`🔗 API:       http://localhost:${PORT}/api/v1`);
});
