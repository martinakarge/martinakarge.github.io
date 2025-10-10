<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-signin-client_id" content="992990668217-km90mi8ec514f68po4235lmkar57oeu1.apps.googleusercontent.com">
    <title>New In Town - Your Friendly Local Guide</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: white;
            color: #333;
            text-align: center;
            padding: 0;
            margin: 0;
            line-height: 1.6;
        }
        #globalHeader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #87CEEB;
            color: #0a0a2e;
            padding: 10px 20px;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: left;
        }
        #globalHeader a {
            color: #0a0a2e;
            text-decoration: none;
            font-size: 1.5em;
            font-weight: bold;
        }
        #globalHeader a:hover {
            color: #5dade2;
        }
        #entryScreen {
            max-width: 600px;
            margin: 80px auto 0;
            padding: 60px 20px;
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        #entryScreen h1 {
            color: #87CEEB;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        #entryScreen p {
            font-size: 1.2em;
            margin-bottom: 40px;
            color: #666;
        }
        .entry-btn {
            padding: 15px 30px;
            background-color: #87CEEB;
            color: #0a0a2e;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            white-space: nowrap;
            transition: background-color 0.3s;
            margin: 10px;
            display: inline-block;
        }
        .entry-btn:hover {
            background-color: #5dade2;
        }
        .g-signin2 {
            margin: 20px auto;
            display: block;
        }
        .g-signin2 .abcRioButton {
            padding: 15px 30px !important;
            font-size: 1.1em !important;
            border-radius: 5px !important;
            background-color: #87CEEB !important;
            color: #0a0a2e !important;
            border: none !important;
            white-space: nowrap !important;
            transition: background-color 0.3s !important;
            margin: 10px !important;
            display: inline-block !important;
        }
        .g-signin2 .abcRioButton:hover {
            background-color: #5dade2 !important;
        }
        #mainApp {
            display: none;
            margin-top: 80px;
        }
        header {
            background-color: #87CEEB;
            color: #0a0a2e;
            padding: 54px 20px;
            margin-bottom: 30px;
            border-radius: 10px;
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
            background: #f8f9fa;
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
            border: 2px solid #87CEEB;
            border-radius: 5px;
            font-size: 1.1em;
            text-align: center;
            min-width: 0;
        }
        input[type="text"]::placeholder {
            color: #a0a0a0;
        }
        button {
            padding: 12px 20px;
            background-color: #87CEEB;
            color: #0a0a2e;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            white-space: nowrap;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #5dade2;
        }
        #saveBtn {
            display: none;
            margin: 10px auto;
        }
        .results {
            margin-top: 30px;
            text-align: left;
            max-width: 600px;
            margin: 30px auto;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: none;
        }
        .results h2 {
            color: #87CEEB;
            text-align: center;
        }
        .rec {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #87CEEB;
        }
        .rec h3 {
            color: #87CEEB;
            margin-top: 0;
        }
        .avoid h3 {
            color: #e74c3c;
        }
        .avoid {
            border-left-color: #e74c3c;
        }
        .google-link {
            color: #87CEEB;
            text-decoration: none;
            font-weight: bold;
        }
        .google-link:hover {
            text-decoration: underline;
        }
        .user-info {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #87CEEB;
            padding: 10px;
            border-radius: 5px;
            color: #0a0a2e;
        }
        .saved-msg {
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            display: none;
        }
    </style>
</head>
<body>
    <div id="globalHeader">
        <a href="javascript:void(0)" onclick="goHome()">New in Town 🌟</a>
    </div>

    <div id="entryScreen">
        <h1>Welcome to NewInTown.io! 🌟</h1>
        <p>Ready to uncover local gems? Choose your way in – sign in to save your faves, or dive right in as a guest!</p>
        <div class="g-signin2" data-onsuccess="onSignInAndProceed" data-theme="outline"></div>
        <br>
        <button id="guestBtn" class="entry-btn">Continue as Guest 😊</button>
    </div>

    <div id="mainApp">
        <div id="userInfo" class="user-info" style="display: none;">
            <span id="userName"></span> | <button id="signOutBtn" style="background: none; color: #e74c3c; border: none; cursor: pointer;">Sign Out</button>
        </div>

        <header>
            <h1>Welcome Back! 🌟</h1>
            <p class="subtitle">Drop your ZIP Code and let's uncover the best spots to eat, sip, stay, and even a gentle nudge on what to skip – all with a local's honest, sunny vibe.</p>
        </header>
        
        <button id="saveBtn" onclick="saveSuggestions()">💾 Save These Gems for Later!</button>
        
        <form id="zipForm">
            <input type="text" id="zipCode" placeholder="Enter ZIP code (e.g., 90210)" maxlength="5" required>
            <button type="submit">Explore!</button>
        </form>
        
        <div id="results" class="results">
            <h2>Your guide to <span id="cityName"></span>!</h2>
            <div id="savedMsg" class="saved-msg"></div>
            <div id="eatRec" class="rec">
                <h3>🍽️ Eat: Cozy Corner Café</h3>
                <p>Fluffy pancakes and killer lattes – the kind of spot that feels like home from bite one. Pro tip: Go for the avocado toast upgrade.</p>
            </div>
            <div id="drinkRec" class="rec">
                <h3>🍸 Drink: Sunset Speakeasy</h3>
                <p>Craft cocktails with a view that'll make you forget you're new here. Skip the tourist traps – this one's a hidden gem.</p>
            </div>
            <div id="stayRec" class="rec">
                <h3>🏨 Stay: The Wander Inn</h3>
                <p>Comfy beds, quirky decor, and breakfast in bed. Affordable bliss for your first nights.</p>
            </div>
            <div id="avoidRec" class="rec avoid">
                <h3>🚫 Skip: That Overhyped Chain</h3>
                <p>Honest heads-up: Crowded, meh service, and prices that sting. Save your energy for the real local flavor!</p>
            </div>
        </div>
    </div>

    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script>
        const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Swap in your free key from console.cloud.google.com!
        let currentSuggestions = {};
        let isSignedIn = false;
        let currentUser = null;

        function goHome() {
            if (isSignedIn) {
                signOut();
            }
            document.getElementById('mainApp').style.display = 'none';
            document.getElementById('entryScreen').style.display = 'block';
            const zipInput = document.getElementById('zipCode');
            if (zipInput) zipInput.value = ''; // Clear input for fresh start
            const results = document.getElementById('results');
            if (results) results.style.display = 'none';
        }

        function onSignIn(googleUser) {
            const profile = googleUser.getBasicProfile();
            document.getElementById('userName').textContent = `Hi, ${profile.getName()}!`;
            document.getElementById('userInfo').style.display = 'block';
            isSignedIn = true;
            currentUser = profile.getId();
            // Load saved suggestions if any
            loadSavedSuggestions();
        }

        function onSignInAndProceed(googleUser) {
            onSignIn(googleUser);
            document.getElementById('entryScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';
        }

        function proceedAsGuest() {
            isSignedIn = false;
            currentUser = 'guest';
            document.getElementById('entryScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';
        }

        function signOut() {
            if (typeof gapi !== 'undefined' && gapi.auth2 && gapi.auth2.getAuthInstance) {
                try {
                    const auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut().then(function () {
                        updateSignOutState();
                    }).catch(function(error) {
                        console.error('Sign out error:', error);
                        updateSignOutState();
                    });
                } catch (error) {
                    console.error('Sign out error:', error);
                    updateSignOutState();
                }
            } else {
                updateSignOutState();
            }
        }

        function updateSignOutState() {
            document.getElementById('userInfo').style.display = 'none';
            isSignedIn = false;
            currentUser = null;
            document.getElementById('saveBtn').style.display = 'none';
        }

        document.getElementById('signOutBtn').onclick = signOut;
        document.getElementById('guestBtn').onclick = proceedAsGuest;

        function saveSuggestions() {
            if (!isSignedIn) {
                alert('Hey friend, sign in with Google to save your faves! 😊');
                return;
            }
            const saved = JSON.parse(localStorage.getItem(`suggestions_${currentUser}`) || '{}');
            saved[currentSuggestions.city] = currentSuggestions;
            localStorage.setItem(`suggestions_${currentUser}`, JSON.stringify(saved));
            const msg = document.getElementById('savedMsg');
            msg.textContent = 'Yay! Your suggestions are saved for your next adventure. 🌈';
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3000);
        }

        function loadSavedSuggestions() {
            if (!isSignedIn || !currentSuggestions.city) return;
            const saved = JSON.parse(localStorage.getItem(`suggestions_${currentUser}`) || '{}');
            if (saved[currentSuggestions.city]) {
                // Could load them here if needed, but for now, just notify
                console.log('Loaded saved suggestions for', currentSuggestions.city);
            }
        }

        async function fetchPlaces(type, lat, lng, minRating = 4.0) {
            if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
                return null; // Placeholder fallback
            }
            try {
                const typeList = type.split('|');
                const searchBody = {
                    includedTypes: typeList,
                    maxResultCount: 20,
                    locationRestriction: {
                        circle: {
                            center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
                            radius: 5000.0
                        }
                    }
                };
                const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': GOOGLE_API_KEY,
                        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.id,places.types'
                    },
                    body: JSON.stringify(searchBody)
                });
                if (searchResponse.ok) {
                    const searchData = await searchResponse.json();
                    const places = searchData.places || [];
                    let filtered = places.filter(p => p.rating && p.rating >= minRating);
                    if (filtered.length === 0) {
                        filtered = places;
                    }
                    if (filtered.length > 0) {
                        const randomPick = filtered[Math.floor(Math.random() * filtered.length)];
                        const name = randomPick.displayName?.text || 'A Great Spot';
                        const address = randomPick.formattedAddress || 'Near you in town';
                        const rating = randomPick.rating || 0;
                        const website = randomPick.websiteUri ? `<br><a href="${randomPick.websiteUri}" target="_blank" class="google-link">Website</a>` : '';
                        const mapLink = `<br><a href="https://www.google.com/maps/place/?q=place_id:${randomPick.id}" target="_blank" class="google-link">Map it!</a>`;
                        let tip = '';
                        if (typeList.includes('restaurant')) tip = ' – Pro tip: Grab a window seat and savor the vibes.';
                        else if (typeList.includes('bar') || typeList.includes('cafe')) tip = ' – Pro tip: Chat up the bartender for insider stories.';
                        else if (typeList.includes('lodging')) tip = ' – Pro tip: Request a room with a view to wake up smiling.';
                        return {
                            html: `
                                <h3>${getEmoji(type)} ${name}</h3>
                                <p>A uplifting pick with fresh energy and welcoming smiles! (Rating: ${rating}/5 ⭐) | ${address}${website}${mapLink}${tip}</p>
                            `,
                            name,
                            rating
                        };
                    }
                }
            } catch (error) {
                console.error('API fetch hiccup:', error);
            }
            return null;
        }

        function getEmoji(type) {
            const typeList = type.split('|');
            if (typeList.includes('restaurant')) return '🍽️';
            if (typeList.includes('bar') || typeList.includes('cafe')) return '🍸';
            if (typeList.includes('lodging')) return '🏨';
            return '✨';
        }

        async function generateAvoid(lat, lng) {
            if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
                return `
                    <h3>🚫 Skip: Generic Chain Spot</h3>
                    <p>Honest nudge: It's got that crowded, overpriced feel – let's channel your energy to brighter local lights instead!</p>
                `;
            }
            try {
                const searchBody = {
                    includedTypes: ['restaurant', 'bar', 'cafe', 'lodging'],
                    maxResultCount: 20,
                    locationRestriction: {
                        circle: {
                            center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
                            radius: 5000.0
                        }
                    }
                };
                const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': GOOGLE_API_KEY,
                        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.id,places.types'
                    },
                    body: JSON.stringify(searchBody)
                });
                if (searchResponse.ok) {
                    const searchData = await searchResponse.json();
                    const places = searchData.places || [];
                    const lowRated = places.filter(p => p.rating && p.rating < 3.0 && p.rating >= 1);
                    if (lowRated.length > 0) {
                        const randomPick = lowRated[Math.floor(Math.random() * lowRated.length)];
                        const name = randomPick.displayName?.text || 'Overhyped Spot';
                        const address = randomPick.formattedAddress || 'Near you in town';
                        const rating = randomPick.rating;
                        const website = randomPick.websiteUri ? `<br><a href="${randomPick.websiteUri}" target="_blank" class="google-link">Website</a>` : '';
                        const mapLink = `<br><a href="https://www.google.com/maps/place/?q=place_id:${randomPick.id}" target="_blank" class="google-link">Map it!</a>`;
                        let category = 'adventure';
                        const types = randomPick.types || [];
                        if (types.includes('restaurant')) category = 'eats';
                        else if (types.includes('bar') || types.includes('cafe')) category = 'sips';
                        else if (types.includes('lodging')) category = 'stays';
                        const tip = ` – Gentle nudge: There are brighter spots nearby for your ${category}.`;
                        return `
                            <h3>🚫 Skip: ${name}</h3>
                            <p>Honest share: It might not live up to the hype with its ${rating}/5 rating. | ${address}${website}${mapLink}${tip}</p>
                        `;
                    }
                }
            } catch (error) {
                console.error('API fetch hiccup:', error);
            }
            // Fallback
            return `
                <h3>🚫 Skip: Generic Chain Spot</h3>
                <p>Honest nudge: It's got that crowded, overpriced feel – let's channel your energy to brighter local lights instead!</p>
            `;
        }

        document.getElementById('zipForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const zip = document.getElementById('zipCode').value.trim();
            if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
                alert('Hey friend, zip codes are 5 digits – try again? 😊');
                return;
            }
            try {
                const zipResponse = await fetch(`https://api.zippopotam.us/us/${zip}`);
                if (!zipResponse.ok) {
                    throw new Error('Invalid ZIP');
                }
                const zipData = await zipResponse.json();
                const place = zipData.places?.[0];
                const cityName = place ? `${place['place name']}, ${place['state']}` : zip;
                document.getElementById('cityName').textContent = cityName;
                if (!place) {
                    throw new Error('No location data');
                }
                const lat = place.latitude;
                const lng = place.longitude;

                // Fetch for each category
                const eat = await fetchPlaces('restaurant', lat, lng);
                if (eat) document.getElementById('eatRec').innerHTML = eat.html;

                const drink = await fetchPlaces('bar|cafe', lat, lng);
                if (drink) {
                    const drinkHtml = drink.html.replace('🍽️', '🍸');
                    document.getElementById('drinkRec').innerHTML = drinkHtml;
                }

                const stay = await fetchPlaces('lodging', lat, lng);
                if (stay) document.getElementById('stayRec').innerHTML = stay.html;

                const avoidHtml = await generateAvoid(lat, lng);
                document.getElementById('avoidRec').innerHTML = avoidHtml;

                // Store current for saving
                currentSuggestions = { 
                    city: cityName, 
                    eat: eat?.name, 
                    drink: drink?.name, 
                    stay: stay?.name 
                };

                document.getElementById('results').style.display = 'block';
                document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

                if (isSignedIn) {
                    document.getElementById('saveBtn').style.display = 'block';
                } else {
                    document.getElementById('saveBtn').style.display = 'none';
                }
            } catch (error) {
                alert(`Whoops, that zip's being mysterious – make sure it's a US spot? Let's try another! 🌍`);
                console.error(error);
            }
        });
    </script>
</body>
</html>
