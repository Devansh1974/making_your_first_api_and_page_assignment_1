const express = require('express');
const app = express();

/*
Task:
You need to build an API for a virtual assistant that provides customized responses.

Requirements:
1. Create a GET endpoint at "/assistant/greet".
2. The endpoint should accept a "name" as a query parameter (e.g., /assistant/greet?name=John).
3. The API should return a JSON response with:
   a. A personalized greeting using the name provided.
   b. A cheerful message based on the current day of the week.

Example Responses:
- For Monday:
  {
    "welcomeMessage": "Hello, John! Welcome to our assistant app!",
    "dayMessage": "Happy Monday! Start your week with energy!"
  }
- For Friday:
  {
    "welcomeMessage": "Hello, John! Welcome to our assistant app!",
    "dayMessage": "It's Friday! The weekend is near!"
  }
- For other days:
  {
    "welcomeMessage": "Hello, John! Welcome to our assistant app!",
    "dayMessage": "Have a wonderful day!"
  }
*/

// Endpoint to provide personalized greeting and day-specific message
app.get('/assistant/greet', (req, res) => {
    const name = req.query.name; // Extract 'name' from query parameters

    // Validate the name parameter
    if (!name) {
        return res.status(400).json({
            error: "Missing 'name' query parameter. Please provide a name!"
        });
    }

    // Get the current day of the week
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const currentDay = new Date().getDay(); // Returns 0 (Sunday) to 6 (Saturday)
    const currentDayName = daysOfWeek[currentDay];

    // Create day-specific cheerful messages
    let dayMessage = "Have a wonderful day!";
    if (currentDayName === "Monday") {
        dayMessage = "Happy Monday! Start your week with energy!";
    } else if (currentDayName === "Friday") {
        dayMessage = "It's Friday! The weekend is near!";
    }

    // Send the JSON response
    res.json({
        welcomeMessage: `Hello, ${name}! Welcome to our assistant app!`,
        dayMessage: dayMessage
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Virtual Assistant API is running on http://localhost:${PORT}`);
});
