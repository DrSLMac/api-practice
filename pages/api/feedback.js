import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(something) {
    const fileData = fs.readFileSync(something);
    const data = JSON.parse(fileData);
    return data;
}

function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        };

        //store that in a database or 
        // in a file => '/data/feedback.json'
        // access this file using the file system module
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Success!', feedback: newFeedback })
    } else { // the else block will be invoked if the method is not a POST
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({ feedback: data });
    }
}

export default handler