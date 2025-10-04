# martinakarge.github.io
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New In Town - Your Friendly Local Guide</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            color: #333;
            text-align: center;
            padding: 20px;
            margin: 0;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 40px 20px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 2.5em;
            margin: 0;
        }
        .subtitle {
            font-size: 1.2em;
            margin-top: 10px;
        }
        form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 0 auto;
        }
        input[type="text"] {
            width: 70%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1.1em;
            text-align: center;
        }
        button {
            width: 25%;
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            margin-left: 5%;
        }
        button:hover {
            background-color: #45a049;
        }
        .results {
            margin-top: 30px;
            text-align: left;
            max-width: 600px;
            margin: 30px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: none;
        }
        .rec {
            background: #e8f5e8;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome, New In Town! 🌟</h1>
        <p class="subtitle">Drop your zip code and let's uncover the best spots to eat, sip, stay, and skip – all with a local's honest vibe.</p>
    </header>
    
    <form id="zipForm">
        <input type="text" id="zipCode" placeholder="Enter ZIP code (e.g., 90210)" maxlength="5" required>
        <button type="submit">Explore!</button>
    </form>
    
    <div id="results" class="results">
        <h2>Your Fresh Start in <span id="cityName"></span>!</h2>
        <div class="rec">
            <h3>🍽️ Eat: Cozy Corner Café</h3>
            <p>Fluffy pancakes and killer lattes – the kind of spot that feels like home from bite one. Pro tip: Go for the avocado toast upgrade.</p>
        </div>
        <div class="rec">
            <h3>🍸 Drink: Sunset Speakeasy</h3>
            <p>Craft cocktails with a view that'll make you forget you're new here. Skip the tourist traps – this one's a hidden gem.</p>
        </div>
        <div class="rec">
            <h3>🏨 Stay: The Wander Inn</h3>
            <p>Comfy beds, quirky decor, and breakfast in bed. Affordable bliss for your first nights.</p>
        </div>
        <div class="rec">
            <h3>🚫 Avoid: That Overhyped Chain</h3>
            <p>Honest heads-up: Crowded, meh service, and prices that sting. Save your energy for the real local flavor!</p>
        </div>
        <p style="font-style: italic; color: #666;">(These are fun placeholders – we'll swap in real recs soon!)</p>
    </div>

    <script>
        document.getElementById('zipForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const zip = document.getElementById('zipCode').value;
            if (zip.length === 5 && /^\d{5}$/.test(zip)) {
                document.getElementById('cityName').textContent = zip; // Placeholder – swap for real lookup later
                document.getElementById('results').style.display = 'block';
                document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Hey friend, zip codes are 5 digits – try again? 😊');
            }
        });
    </script>
</body>
</html>
