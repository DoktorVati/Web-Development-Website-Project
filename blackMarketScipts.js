
// I decided to have it retry 3 times just in case 1 fails, and I added a delay so that it waits for the prompt to complete.
async function generateImage(retries = 3, delay = 2000,value, prompted) {
    // This is the url for the api
    const url = "https://modelslab.com/api/v6/images/text2img";
    // This is the payload that they want me to use, I use the prompt and negative prompt to generate a prompted image. 
    const payload = {
        key:"9mzq3ZMDMlrY5K1Ezu6LNIRJVbYH4Ui5yMWRiZ27ghtAKhMhJOlCch1OD5dP",
        //key: "fAOgszo9xJVYssy7sfsteGmZnuF0N82de1oZ880rEsyBZneMu66FrHj3n0N8",
        model_id: "dreamshaper-v8",
        prompt: prompted,
        negative_prompt: "painting, poorly drawn, deformed, blurry, cartoonish, low resolution, poorly defined, abstract, anime",
        width: "512",
        height: "512",
        samples: "1",
        num_inference_steps: "30",
        safety_checker: "no",
        enhance_prompt: "yes",
        seed: null,
        guidance_scale: 7.5,
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings: "embeddings_model_id",
        lora: "lora_model_id",
        webhook: null,
        track_id: null
    };
    switch (value) {
        case 2:
            document.getElementById('generateButton2').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
            document.getElementById('generateButtonClass2').style.display="none";
    
            break;
        case 3:
            document.getElementById('generateButton3').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
            document.getElementById('generateButtonClass3').style.display="none";
            
            break;
        case 4:
            document.getElementById('generateButton4').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
            document.getElementById('generateButtonClass4').style.display="none";
            
            break;
        default:
            document.getElementById('generateButton1').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
            document.getElementById('generateButtonClass').style.display="none";
            
            break;
    }
    // In case it fails, I surrounded it in a try and catch
    try {  
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
            // The response for access to the website
        if (response.ok) {
            const data = await response.json();
            console.log(data); // I Log the entire response so that I can use it for debugging

            
            switch (value) {
                case 2:
                    document.getElementById('generateButton2').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
                    document.getElementById('generateButtonClass2').style.display="none";
            
                    break;
                case 3:
                    document.getElementById('generateButton3').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
                    document.getElementById('generateButtonClass3').style.display="none";
                    
                    break;
                case 4:
                    document.getElementById('generateButton4').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
                    document.getElementById('generateButtonClass4').style.display="none";
                    
                    break;
                default:
                    document.getElementById('generateButton1').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
                    document.getElementById('generateButtonClass').style.display="none";
                    
                    break;
            }
            // Access the output array and get the first image URL
            if (data.output && data.output.length > 0) {
                // Get the image URL from the output array
                const imageUrl = data.output[0]; 
                const generatedImage = document.getElementById('generated' + value);  // This element is what will be replaced by the AI image

                const parentElement = generatedImage.parentElement;  // This parent element is assigned so that it can be no longer hidden
                
                generatedImage.src = imageUrl; // Set the image source
                generatedImage.style.display = 'inline-block'; // Show the image
                parentElement.style.display = 'block'; // Show the parent element
                //document.getElementById('generateButton1').style.display="none"; // Hide the generate button image after click so that it doesn't cause more api calls 
                //const buttonDiv = document.getElementById('generateButtonClass');
                //buttonDiv.style.display = 'none';
                //const buttonobject = document.getElementById('generateButton1');
                //buttonobject.style.display = 'none';

            } else {
                console.error("Image not found in the response.", data); // Error
                alert("Unable to generate image. Please try again."); // 
                switch (value) {
                    case 2:
                        document.getElementById('generateButton2').style.display="inline-block"; // Hide the generate button image after click so that it doesn't cause more api calls 
                        document.getElementById('generateButtonClass2').style.display="block";
                
                        break;
                    case 3:
                        document.getElementById('generateButton3').style.display="inline-block"; // Hide the generate button image after click so that it doesn't cause more api calls 
                        document.getElementById('generateButtonClass3').style.display="block";
                        
                        break;
                    case 4:
                        document.getElementById('generateButton4').style.display="inline-block"; // Hide the generate button image after click so that it doesn't cause more api calls 
                        document.getElementById('generateButtonClass4').style.display="block";
                        
                        break;
                    default:
                        document.getElementById('generateButton1').style.display="inline-block"; // Hide the generate button image after click so that it doesn't cause more api calls 
                        document.getElementById('generateButtonClass').style.display="block";
                        
                        break;
                }
            }
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delay)); // Wait for specified delay
            return generateImage(retries - 1, delay); // Retry the function
        } 
    }
    
    // Call to generate text after the image generation attempt
    //generateText(value);
}

// Function for generating the AI text for the image. 
// It is set up similarly to the other API call
async function generateText(value) {
    const url = 'https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles?category=short%20description%20of%20a%20crazy%20animal';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '736245e896mshfb15eb128512e4bp13fe27jsnf4b1d2d97eee', // API key
            'x-rapidapi-host': 'contentai-net-text-generation.p.rapidapi.com' // Website
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (response.ok) {
            const result = await response.json(); // Parse JSON response
            
            // Extract the text part starting from "text:"
            const text = result.text;
            const startIndex = text.indexOf("text:") + 5; // Start after the chars "text:"
            const textSubstring = text.substring(startIndex).trim(); // Extract substring

            // Find the first two periods and cut the text there
            // I do this because it has a title sometimes and this makes sure it is not shown.
            const firstPeriodIndex = textSubstring.indexOf('.') + 1; // First period
            const secondPeriodIndex = textSubstring.indexOf('.', firstPeriodIndex) + 1; // Second period
            const thirdPeriodIndex = textSubstring.indexOf('.', secondPeriodIndex) + 1; // Third period

            // Cut off after the second period
            const limitedText = thirdPeriodIndex !== -1 ? textSubstring.substring(firstPeriodIndex, thirdPeriodIndex).trim() : textSubstring;

            console.log(limitedText); // Log the limited text for debugging
            
            // Update the paragraph with id 'generatedText1' with the processed text
            const generatedTextElement = document.getElementById('generatedText' + value);
            generatedTextElement.textContent = limitedText; // Set the text content
            generatedTextElement.style.display = 'block'; // Show the paragraph after generation
        } else {
            console.error("Error fetching text:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Check if the current page is BlackMarketStock.html
if (window.location.pathname.includes('BlackMarketStock.html')) {
    document.getElementById('generateButton1').addEventListener('click', () => {
        generateImage(3, 2000, 1, "ultra realistic portrait of a bizarre, fantastical creature with exaggerated features, bad anatomy, bad proportions, wild colors, extra limbs, mutated features, large expressive eyes, mix of animals, hyper detail, 8K, RAW, unedited, symmetrical balance")
            .then(() => textGeneration()); // Call text generation after image generation
    });

    document.getElementById('generateButton2').addEventListener('click', () => {
        generateImage(3, 2000, 2, "ultra realistic portrait of an alien creature with alien features, bad anatomy, bad proportions, extra limbs, mutated features, large expressive eyes, hyper detail, 8K, RAW, unedited, symmetrical balance")
            .then(() => textGeneration());
    });

    document.getElementById('generateButton3').addEventListener('click', () => {
        generateImage(3, 2000, 3, "ultra realistic portrait of an animal, hyper detail, 8K, RAW, unedited, symmetrical balance")
            .then(() => textGeneration());
    });

    document.getElementById('generateButton4').addEventListener('click', () => {
        generateImage(3, 2000, 4, "ultra realistic portrait of a dinosaur, scary, hyper detail, 8K, RAW, unedited, symmetrical balance")
            .then(() => textGeneration());
    });
}

// Load cart data from local storage on page load
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve items from local storage
let cartCount = cartItems.length; // Count of items in cart

// Update the displayed cart count
document.getElementById('itemsInCart').textContent = cartCount;

// Function to display cart items, total cost, and payment option
function displayCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalCostContainer = document.getElementById("totalCost");
    const paymentContainer = document.getElementById("paymentContainer");

    let totalCost = 0;
    cartItemsContainer.innerHTML = ''; // Clear previous content

    const itemCounts = {};

    cartItems.forEach(item => {
        const key = `${item.name}-${item.price}`; // Unique key for each item
        itemCounts[key] = (itemCounts[key] || 0) + 1; // Increment count
    });

    for (const [key, quantity] of Object.entries(itemCounts)) {
        const [name, price] = key.split('-');
        const item = cartItems.find(i => i.name === name); // Find original item

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Calculate total cost for this item
        const itemTotalCost = (price * quantity).toFixed(2);

        itemDiv.innerHTML = `
    <div class="storeP" style="display: flex; align-items: center; justify-content: space-between;">
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto; margin-right: 10px;">
        <div style="flex-grow: 1; display: flex; flex-direction: column; margin-right: 10px;">
            <span class="specialDescription">${name}</span>
            <span class="specialDescription" style="margin-top: 5px;">Price: ${price} BTC</span> <!-- Price below special description -->
        </div>
        <div style="display: flex; align-items: center; margin-right: 10px;">
            <label style="margin-left: 25px; margin-right: 5px;">Quantity:</label>
            <span class="quantityText" contenteditable="true" data-name="${name}" data-price="${price}">${quantity}</span>
        </div>
        <p class="storeP" style="margin-left:50px;">Total Cost: ${itemTotalCost} BTC</p>
        <button type="button" style="margin-left: 50px; " class="removeBtn" data-name="${name}" data-price="${price}">Remove from Cart</button>

        </div>
`;


    
        cartItemsContainer.appendChild(itemDiv);
        totalCost += item.price * quantity; // Calculate total cost using quantity
    }

    totalCostContainer.innerHTML = `Total Cost: ${totalCost.toFixed(2)} Bitcoin`;
    
    // Payment form
    paymentContainer.innerHTML = `
        <label for="walletAddress">Wallet Address:</label>
        <input type="text" id="walletAddress" placeholder="Enter your wallet address">
        <button id="payButton">Pay Now</button>
    `;

    // Event listener for payment button
    document.getElementById('payButton').addEventListener('click', () => {
        const walletAddress = document.getElementById('walletAddress').value;
        
        // Validate wallet address length (Bitcoin addresses are usually 26-35 characters)
        if (walletAddress.length >= 26 && walletAddress.length <= 35) {
            alert(`Payment of ${totalCost.toFixed(2)} Bitcoin will be sent to our wallet at g7KjZy3LqV8uH2rM9wTdQ4XfRzKpN5sF from your wallet address ${walletAddress}`);
            clearCart(); // Clear the cart after payment is confirmed
        } else {
            alert('Please enter a valid wallet address (26-35 characters).');
        }
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.removeBtn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name'); // Get name from data attribute
            const price = parseFloat(this.getAttribute('data-price')); // Get price from data attribute
            removeFromCart(name, price); // Call remove function
        });
    });
    

    
    // Add event listeners for quantity text fields
document.querySelectorAll('.quantityText').forEach(quantityField => {
    quantityField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent newline
            this.blur(); // Remove focus to trigger blur event
        }
    });

    quantityField.addEventListener('blur', function() {
        const newQuantity = parseInt(this.textContent.trim(), 10);
        const name = this.getAttribute('data-name'); // Get name from data attribute
        const price = parseFloat(this.getAttribute('data-price')); // Get price from data attribute

        // Validate newQuantity
        if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 100) {
            updateQuantity(name, price, newQuantity);
        } else {
            alert('Please enter a valid quantity between 0 and 100.');
            this.textContent = '1'; // Reset to 1 if invalid
        }
    });
});

}

// Function to remove item from cart entirely
function removeFromCart(name, price) {
    cartItems = cartItems.filter(item => !(item.name === name && item.price === price)); // Remove all quantities
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    cartCount = cartItems.length; // Update cart count
    document.getElementById('itemsInCart').textContent = cartCount; // Update displayed count
    displayCart(); // Refresh the cart display
}

// Function to update item quantity
function updateQuantity(name, price, newQuantity) {
    // Find the item index
    const itemIndex = cartItems.findIndex(item => item.name === name && item.price === price);
    
    if (itemIndex !== -1) {
        // If new quantity is 0 or less, remove the item from cart
        if (newQuantity <= 0) {
            removeFromCart(name, price);
        } else {
            const currentItem = cartItems[itemIndex];
            // Update the quantity in the cart based on the newQuantity
            const currentCount = cartItems.filter(item => item.name === name && item.price === price).length;

            // Update the cart
            if (newQuantity > currentCount) {
                // Add items back to the cart
                for (let i = 0; i < (newQuantity - currentCount); i++) {
                    addToCart(currentItem.name, currentItem.price, currentItem.image, currentItem.description);
                }
            } else if (newQuantity < currentCount) {
                // Remove items from the cart
                for (let i = 0; i < (currentCount - newQuantity); i++) {
                    removeOneFromCart(currentItem.name, currentItem.price);
                }
            }
        }
    }

    displayCart(); // Refresh the cart display after updating quantity
}

// Function to remove one item from cart
function removeOneFromCart(name, price) {
    const index = cartItems.findIndex(item => item.name === name && item.price === price); // Find the item
    if (index !== -1) {
        cartItems.splice(index, 1); // Remove one instance of the item
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
        cartCount = cartItems.length; // Update cart count
        document.getElementById('itemsInCart').textContent = cartCount; // Update displayed count
        displayCart(); // Refresh the cart display
    }
}

// Function to clear the cart
function clearCart() {
    cartItems = []; // Reset cart items array
    localStorage.removeItem('cartItems'); // Clear items from local storage
    cartCount = 0; // Reset count
    document.getElementById('itemsInCart').textContent = cartCount; // Update displayed count
    document.getElementById("cartItems").innerHTML = ''; // Clear cart display
    document.getElementById("totalCost").innerHTML = ''; // Clear total cost display
    document.getElementById("paymentContainer").innerHTML = ''; // Clear payment form
    alert('Thank you for your payment! Your cart has been cleared.'); // Confirmation message
}

// Function to add item to cart
function addToCart(name, price, image) {
    cartItems.push({ name, price, image }); // Include description
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    cartCount = cartItems.length; // Update cart count
    document.getElementById('itemsInCart').textContent = cartCount; // Display updated count
    console.log(`Added to cart: ${name} - ${price}`); // For debugging
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.parentElement.querySelector('.specialDescription').textContent; // Get item name
        
        // Get description by targeting the text node after the <br>
        const descriptionParagraph = this.parentElement.querySelector('.storeP');
        
        const priceText = this.parentElement.querySelectorAll('.storeP')[1].textContent; // Get price text
        const price = parseFloat(priceText.split(': ')[1]); // Extract price
        const image = this.parentElement.querySelector('img').src; // Get item image
        
        addToCart(name, price, image); // Call add to cart function
    });
});

// Check if the current page is the cart page and display items
if (window.location.pathname.includes('BlackMarketCart.html')) {
    window.onload = displayCart; // Display cart items when the page loads
}







function showPopup() {
    // Define an array of messages
    const messages = [
        "Your IP is being leaked! (This is a popup for BlackMarketAnimalia)",
        "Download Free RAM Now!",
        "$$$$$$Want to get free Cash? Visit freecash.com now! $$$$$",
        "You are being hacked! (This is a popup for BlackMarketAnimalia)",
        "Virus detected! (This is a popup for BlackMarketAnimalia)",
        "Suspicious activity detected on your device! (This is a popup for BlackMarketAnimalia)",
        "Your security is at risk! (This is a popup for BlackMarketAnimalia)",
        "Immediate action required: malware found! (This is a popup for BlackMarketAnimalia)"
    ];

    // Select a random message from the array
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Ensure popups don't go off-screen
    let left = Math.min(Math.floor(Math.random() * (window.innerWidth - 550)), window.innerWidth - 550);
    let top = Math.min(Math.floor(Math.random() * (window.innerHeight - 400)), window.innerHeight - 400);

    // Open a new window at the random position
    let myWindow = window.open("", "", `width=450,height=300,left=${left},top=${top}`);
    
    // Create the popup content
    myWindow.document.writeln(`
        <html>
        <head>
            <title>Alert</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8d7da;
                    color: #721c24;
                    text-align: center;
                    padding: 20px;
                }
                h1 {
                    color: #d9534f;
                }
                p {
                    font-size: 16px;
                    margin-top: 10px;
                }
                .button {
                    background-color: #d9534f;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 15px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 15px;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #c9302c;
                }
            </style>
        </head>
        <body>
            <h1>Warning!</h1>
            <p>${randomMessage}</p>
            <p>Please take immediate action!</p>
            <button class="button" onclick="window.close()">DOWNLOAD</button>
        </body>
        </html>
    `);
    myWindow.document.close(); // Close the document stream

    // Schedule the next popup
    randomPopup();
}

function randomPopup() {
    // Generate a random time between 20 and 60 seconds (20000 to 60000 milliseconds)
    const minTime = 20000; // 20 seconds
    const maxTime = 60000; // 60 seconds
    const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    // Set a timeout to show the popup
    setTimeout(showPopup, randomTime);
}


// Call the randomPopup function on window load
// Enable for build
//window.onload = randomPopup;
