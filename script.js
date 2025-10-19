const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Swap in your free key from console.cloud.google.com!
let currentSuggestions = {};
let isSignedIn = false;
let currentUser = null;

function handleCredentialResponse(response) {
    if (response && response.credential) {
        const profile = jwtDecode(response.credential); // Fixed: Use jwtDecode (camelCase) instead of jwt_decode
        onSignIn(profile);
        document.getElementById('entryScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
    }
}

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

function onSignIn(profile) {
    document.getElementById('userName').textContent = `Hi, ${profile.name}!`;
    document.getElementById('userInfo').style.display = 'block';
    isSignedIn = true;
    currentUser = profile.sub;
    // Load saved suggestions if any
    loadSavedSuggestions();
}

function proceedAsGuest() {
    isSignedIn = false;
    currentUser = 'guest';
    document.getElementById('entryScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

function signOut() {
    if (currentUser && typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.revoke(currentUser, function(revoked) {
            if (revoked.success) {
                console.log('Google access revoked');
            }
        });
    }
    updateSignOutState();
}

function updateSignOutState() {
    document.getElementById('userInfo').style.display = 'none';
    isSignedIn = false;
    currentUser = null;
    document.getElementById('saveBtn').style.display = 'none';
}

document.getElementById('signOutBtn').onclick = signOut;
document.getElementById('guestBtn').onclick = proceedAsGuest;

// Attach click handler for custom Google button
document.addEventListener('DOMContentLoaded', function() {
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
        googleBtn.onclick = function(e) {
            e.preventDefault();
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                google.accounts.id.prompt(function(notification) {
                    // Optional: Handle cases where prompt is not displayed
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log('Sign-in prompt was not displayed');
                    }
                });
            } else {
                console.error('Google Identity Services not loaded yet');
            }
        };
    }
});

function saveSuggestions() {
    if (!isSignedIn || currentUser === 'guest') {
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

        if (isSignedIn && currentUser !== 'guest') {
            document.getElementById('saveBtn').style.display = 'block';
        } else {
            document.getElementById('saveBtn').style.display = 'none';
        }
    } catch (error) {
        alert(`Whoops, that zip's being mysterious – make sure it's a US spot? Let's try another! 🌍`);
        console.error(error);
    }
});
