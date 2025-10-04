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
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }
        input[type="text"] {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1.1em;
            text-align: center;
            min-width: 0;
        }
        button {
            padding: 12px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            white-space: nowrap;
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
        .google-link {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
        }
        .google-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to New In Town! 🌟</h1>
        <p class="subtitle">Drop your ZIP Code and let's uncover the best spots to eat, sip, stay, and skip – all with a local's honest vibe.</p>
    </header>
    
    <form id="zipForm">
        <input type="text" id="zipCode" placeholder="Enter ZIP code (e.g., 90210)" maxlength="5" required>
        <button type="submit">Explore!</button>
    </form>
    
    <div id="results" class="results">
        <h2>Your Fresh Start in <span id="cityName"></span>!</h2>
        <div id="eatRec" class="rec">
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
        const GOOGLE_API_KEY = 'goes here'; // Swap in your free key from console.cloud.google.com!

        document.getElementById('zipForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const zip = document.getElementById('zipCode').value.trim();
            if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
                alert('Hey friend, zip codes are 5 digits – try again? 😊');
                return;
            }
            try {
                // First, get city and lat/lng from zip
                const zipResponse = await fetch(`https://api.zippopotam.us/us/${zip}`);
                if (!zipResponse.ok) {
                    throw new Error('Invalid ZIP');
                }
                const zipData = await zipResponse.json();
                const place = zipData.places?.[0];
                const cityName = place ? `${place['place name']}, ${place.state}` : zip;
                document.getElementById('cityName').textContent = cityName;
                if (!place) {
                    throw new Error('No location data');
                }
                const lat = place.latitude;
                const lng = place.longitude;

                // Now, fetch a random high-rated restaurant via Google Places Nearby Search
                let restaurantHtml = ''; // Fallback to placeholder if API skips
                if (GOOGLE_API_KEY && GOOGLE_API_KEY !== 'YOUR_GOOGLE_API_KEY_HERE') {
                    try {
                        const searchBody = {
                            includedType: 'restaurant',
                            maxResultCount: 20,
                            locationRestriction: {
                                circle: {
                                    center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
                                    radius: 5000.0 // 5km radius for local flavor
                                }
                            }
                        };
                        const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Goog-Api-Key': GOOGLE_API_KEY,
                                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.id'
                            },
                            body: JSON.stringify(searchBody)
                        });
                        if (searchResponse.ok) {
                            const searchData = await searchResponse.json();
                            const places = searchData.places || [];
                            const highRated = places.filter(p => p.rating && p.rating >= 4.0);
                            if (highRated.length > 0) {
                                const randomPick = highRated[Math.floor(Math.random() * highRated.length)];
                                const name = randomPick.displayName?.text || 'A Tasty Spot';
                                const address = randomPick.formattedAddress || 'Near you in town';
                                const rating = randomPick.rating || 0;
                                const website = randomPick.websiteUri ? `<br><a href="${randomPick.websiteUri}" target="_blank" class="google-link">Website</a>` : '';
                                restaurantHtml = `
                                    <h3>🍽️ Eat: ${name}</h3>
                                    <p>Locals love it for the fresh twists and warm welcomes – a stellar first meal! (Rating: ${rating}/5 ⭐) | ${address}${website}<br>
                                    <a href="https://www.google.com/maps/place/?q=place_id:${randomPick.id}" target="_blank" class="google-link">Map it!</a> – Pro tip: Grab a window seat and let the flavors unfold.</p>
                                `;
                            } else if (places.length > 0) {
                                // Fallback to top pick
                                const randomPick = places[Math.floor(Math.random() * places.length)];
                                const name = randomPick.displayName?.text || 'A Tasty Spot';
                                const address = randomPick.formattedAddress || 'Near you in town';
                                const rating = randomPick.rating || 0;
                                restaurantHtml = `
                                    <h3>🍽️ Eat: ${name}</h3>
                                    <p>A reliable crowd-pleaser to kick off your adventures! (Rating: ${rating}/5 ⭐) | ${address}<br>
                                    <a href="https://www.google.com/maps/place/?q=place_id:${randomPick.id}" target="_blank" class="google-link">Map it!</a></p>
                                `;
                            }
                        }
                    } catch (googleError) {
                        console.error('Google Places fetch hiccup:', googleError);
                        // Keep placeholder – no drama
                    }
                }
                if (restaurantHtml) {
                    document.getElementById('eatRec').innerHTML = restaurantHtml;
                }

                document.getElementById('results').style.display = 'block';
                document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                alert(`Whoops, that zip's being mysterious – make sure it's a US spot? Let's try another! 🌍`);
                console.error(error);
            }
        });
    </script>
</body>
</html>
