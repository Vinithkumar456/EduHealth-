const model = require('../config/geminiConfig'); 

const assessment = async (req, res) => {
    try {
        const { response1,response2,response3,response4,response5,response6,response7,response8,response9,response10 } = req.body;
        console.log(req.body);
        let fullPrompt = `Analyze the following school mental health assessment based on the user's responses.

### **Assessment Questions & Responses**  

1️⃣ How often do you feel overwhelmed by schoolwork? A) Almost every day
B) A few times a week
C) Occasionally
D) Rarely or never→ ${response1}  
2️⃣ How do you usually feel about exams and assessments? A) Extremely anxious, affecting my performance
B) Somewhat stressed but manageable
C) Neutral, I prepare and do my best
D) Confident and well-prepared→ ${response2}  
3️⃣ How comfortable are you discussing your mental health with teachers or school counselors?A) Not comfortable at all
B) A little comfortable
C) Quite comfortable
D) Very comfortable → ${response3}  
4️⃣ How well do you balance academics and personal time?A) I struggle a lot and feel exhausted
B) It’s difficult but manageable
C) I maintain a decent balance
D) I have a well-structured routine → ${response4}  
5️⃣ How often do you experience burnout due to academic pressure? A) Very frequently
B) Sometimes
C) Rarely
D) Never→ ${response5}  
6️⃣ How do you handle stressful situations at school? A) I panic and feel overwhelmed
B) I try to push through, but it’s tough
C) I use some coping strategies
D) I manage stress effectively→ ${response6}  
7️⃣ How connected do you feel with your classmates and peers?A) Very disconnected and lonely
B) Somewhat isolated at times
C) I have a few good friends
D) I feel well-connected and supported → ${response7}  
8️⃣ How often do you feel motivated to attend school?A) Almost never
B) Occasionally
C) Most of the time
D) Always excited to learn → ${response8}  
9️⃣ What is your main source of emotional support in school? A) No one, I keep things to myself
B) A close friend or peer
C) A teacher or counselor
D) My family or external support→ ${response9}  
🔟 How do you feel about the mental health resources available in your school?A) They are not helpful or accessible
B) They exist but are not effective
C) Somewhat useful but need improvement
D) Very helpful and supportive → ${response10}  

---

### **Generate a JSON response in the following structure:**  

json
{
  "mental_health_assessment": {
    "overall_summary": "A brief summary of the user's mental health condition based on responses.",
    "key_issues": [
      "List of primary concerns based on answers, e.g., stress, lack of peer support, exam anxiety."
    ],
    "positives": [
      "List of strengths, e.g., good time management, support system."
    ],
    "negatives": [
      "List of weaknesses, e.g., struggles with academic pressure, difficulty opening up."
    ],
    "recommended_actions": {
      "immediate": [
        "Steps the user can take right away, e.g., talk to a counselor, practice mindfulness."
      ],
      "long_term": [
        "Ongoing strategies, e.g., improving study habits, building social connections."
      ]
    },
    "suggested_exercises": [
      {
        "name": "Mindfulness Breathing",
        "description": "A short breathing exercise to reduce stress before exams.",
        "duration": "5 minutes"
      },
      {
        "name": "Journaling",
        "description": "Write about daily experiences and emotions to process feelings.",
        "duration": "10 minutes"
      }
    ]
  }
}
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        
        const cleanedText = text
            .replace(/```json/g, '')  
            .replace(/```/g, '')      
            .trim();                  

        
        let structuredResponse;
        try {
            structuredResponse = JSON.parse(cleanedText);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            structuredResponse = {
                error: "Failed to parse AI response. Please try again."
            };
        }

        
        res.json({
            message: "insights generated successfully",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { assessment };
