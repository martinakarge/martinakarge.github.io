<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New In Town - Your Friendly Local Guide</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #FAFAFA;
            color: #000;
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
            background-color: #FFF;
            color: #000;
            padding: 10px 20px;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #globalHeader a {
            color: #000;
            text-decoration: none;
            font-size: 1.5em;
            font-weight: bold;
        }
        #globalHeader a:hover {
            color: #FF6B00;
        }
        #globalHeader .nav-links {
            display: flex;
            gap: 20px;
            font-size: 1em;
        }
        #globalHeader .nav-links a {
            color: #000;
            font-size: 1em;
            font-weight: normal;
        }
        #globalHeader .nav-links a:hover {
            color: #FF6B00;
        }
        #entryScreen {
            max-width: 600px;
            margin: 80px auto 0;
            padding: 60px 20px;
            background: #FFF;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        #entryScreen h1 {
            color: #FF6B00;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        #entryScreen p {
            font-size: 1.2em;
            margin-bottom: 40px;
            color: #333;
        }
        .entry-btn {
            padding: 15px 30px;
            background-color: #FF6B00;
            color: #FFF;
            border: none;
            border-radius: 5px;
            font-size: 1
