const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;
const WIKI_DATA_PATH = process.env.WIKI_DATA_PATH || path.join(__dirname, '../wiki-data');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Helper: Ensure wiki data directory exists
if (!fs.existsSync(WIKI_DATA_PATH)) {
    fs.mkdirSync(WIKI_DATA_PATH, { recursive: true });
}

// API: List all markdown documents
app.get('/api/docs', (req, res) => {
    try {
        const files = fs.readdirSync(WIKI_DATA_PATH).filter(file => file.endsWith('.md'));
        const docList = files.map(file => {
            const name = file.replace('.md', '').replace(/-/g, ' ');
            return { id: file, title: name };
        });
        res.json({ success: true, docs: docList });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// API: Read and parse specific markdown document
app.get('/api/docs/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(WIKI_DATA_PATH, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        const rawContent = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked.parse(rawContent);

        res.json({ success: true, filename, raw: rawContent, html: htmlContent });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'HEALTHY', service: 'docs-as-code-portal' });
});

app.listen(PORT, () => {
    console.log(`Docs-as-Code Wiki Portal running on http://localhost:${PORT}`);
});
