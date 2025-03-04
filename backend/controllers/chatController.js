const model = require('../config/geminiConfig'); 
const cleanResponse = (response) => {
    return response
        .replace(/[\n*]/g, '')  
        .replace(/\s+/g, ' ')   
        .trim();                
};

const Chat = async (req, res) => {
    try {
        
        const { prompt} = req.body;
        let fullPrompt;

        fullPrompt=`You are AI based mental health being chatBot, Provide solution for ${prompt} with focus on school student mental health and give your answer in 100 words maximum`;

        
        const result = await model.generateContent(fullPrompt);
        const response=await result.response;
        const  text=await response.text();
        const cleanedText = cleanResponse(text);


        
        res.json(cleanedText); 

    } catch (error) {
        
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { Chat };
