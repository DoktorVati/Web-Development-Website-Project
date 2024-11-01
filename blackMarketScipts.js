
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
    generateText(value);
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
let cartCount = cartItems.length; 

// Update the displayed cart count
document.getElementById('itemsInCart').textContent = cartCount;

// Function to display the  cart items, total cost, and payment option
function displayCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalCostContainer = document.getElementById("totalCost");
    const paymentContainer = document.getElementById("paymentContainer");

    let totalCost = 0;
    cartItemsContainer.innerHTML = ''; 

    // Inform the user that their cart is empty
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Message for empty cart
        return; 
    }
    const itemCounts = {};

    // Create a key for each item to better keep track
    cartItems.forEach(item => {
        const key = `${item.name}-${item.price}`; 
        itemCounts[key] = (itemCounts[key] || 0) + 1; 
    });

    for (const [key, quantity] of Object.entries(itemCounts)) {
        const [name, price] = key.split('-');
        const item = cartItems.find(i => i.name === name); 

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Calculate total cost for this item
        const itemTotalCost = (price * quantity).toFixed(2);

        // This builds the items in the cart
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
         // Calculate total cost for item  using quantity
        totalCost += item.price * quantity;
    }

    totalCostContainer.innerHTML = `
    <div class="totalCost">
        <h2>Total Cost</h2>
        <p class="amount">${totalCost.toFixed(2)} BTC</p>
    </div>
`;
    
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
        // I included an example wallet that you can copy and paste for testing

        // Clears the cart after payment.
        if (walletAddress.length >= 26 && walletAddress.length <= 35) {
            alert(`Payment of ${totalCost.toFixed(2)} Bitcoin will be sent to our wallet at g7KjZy3LqV8uH2rM9wTdQ4XfRzKpN5sF from your wallet address ${walletAddress}`);
            clearCart(); 
        } else {
            alert('Please enter a valid wallet address (26-35 characters).');
        }
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.removeBtn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name'); 
            const price = parseFloat(this.getAttribute('data-price'));
            removeFromCart(name, price);
        });
    });
    

    
    // Add event listeners for quantity text fields
document.querySelectorAll('.quantityText').forEach(quantityField => {
    quantityField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            this.blur(); 
        }
    });

    quantityField.addEventListener('blur', function() {
        const newQuantity = parseInt(this.textContent.trim(), 10);
        const name = this.getAttribute('data-name'); /
        const price = parseFloat(this.getAttribute('data-price'));

        // Validates the  newQuantity to ensure number is entered between 0 and 100
        if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 100) {
            updateQuantity(name, price, newQuantity);
        } else {
            alert('Please enter a valid quantity between 0 and 100.');
            this.textContent = '1'; // Resets to 1 if an  invalid amount is entered
        }
    });
});

}

// Function to remove item from cart entirely by removing info from storage and decreasing quanity and cost
function removeFromCart(name, price) {
    cartItems = cartItems.filter(item => !(item.name === name && item.price === price)); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    cartCount = cartItems.length; 
    document.getElementById('itemsInCart').textContent = cartCount; 
    displayCart();
}

// Function to update the item quantity
function updateQuantity(name, price, newQuantity) {
    // Find the items index
    const itemIndex = cartItems.findIndex(item => item.name === name && item.price === price);
    
    if (itemIndex !== -1) {
        // If new quantity is 0 or less it will remove the item from the cart
        if (newQuantity <= 0) {
            removeFromCart(name, price);
        } else {
            const currentItem = cartItems[itemIndex];
            // Updates the quantity in the cart based on the newQuantity
            const currentCount = cartItems.filter(item => item.name === name && item.price === price).length;

            // Updates the cart quantity
            if (newQuantity > currentCount) {
                // Adds items back to the cart
                for (let i = 0; i < (newQuantity - currentCount); i++) {
                    addToCart(currentItem.name, currentItem.price, currentItem.image, currentItem.description);
                }
            } else if (newQuantity < currentCount) {
                // Removes items from the cart
                for (let i = 0; i < (currentCount - newQuantity); i++) {
                    removeOneFromCart(currentItem.name, currentItem.price);
                }
            }
        }
    }
    // displays the cart
    displayCart(); 
}

// Function to remove one item from a cart, this is used repeatedly when they change the quantity
function removeOneFromCart(name, price) {
    const index = cartItems.findIndex(item => item.name === name && item.price === price); 
    if (index !== -1) {
        cartItems.splice(index, 1); 
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        cartCount = cartItems.length; 
        document.getElementById('itemsInCart').textContent = cartCount; 
        displayCart(); 
    }
}

// Function to clear the cart and thank them for the purchase
// Resets info in storage
function clearCart() {
    cartItems = []; 
    localStorage.removeItem('cartItems'); 
    cartCount = 0; 
    document.getElementById('itemsInCart').textContent = cartCount; 
    document.getElementById("cartItems").innerHTML = ''; 
    document.getElementById("totalCost").innerHTML = ''; 
    document.getElementById("paymentContainer").innerHTML = ''; 
    alert('Thank you for your payment! Your cart has been cleared.'); 
}

// Function to add item to cart and change the local storage array of info
function addToCart(name, price, image) {
    cartItems.push({ name, price, image }); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    cartCount = cartItems.length; 
    document.getElementById('itemsInCart').textContent = cartCount; 
    console.log(`Added to cart: ${name} - ${price}`);
}

// Attaches event listeners to the Add to Cart buttons and copy info from each item
document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.parentElement.querySelector('.specialDescription').textContent; // Get item name
        
        const priceText = this.parentElement.querySelectorAll('.storeP')[1].textContent; // Gets the price text
        const price = parseFloat(priceText.split(': ')[1]); // Extracts price from each image
        const image = this.parentElement.querySelector('img').src; 
        
        addToCart(name, price, image); 
    });
});

// Checks if the current page is the cart page and displays  the items
if (window.location.pathname.includes('BlackMarketCart.html')) {
    window.onload = displayCart; 
}



function showPopup() {
    // These are the messages that can be generated
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

    // places popups in random spots on the screen
    let left = Math.min(Math.floor(Math.random() * (window.innerWidth - 550)), window.innerWidth - 550);
    let top = Math.min(Math.floor(Math.random() * (window.innerHeight - 400)), window.innerHeight - 400);

    // Open a new window at the random position
    let myWindow = window.open("", "", `width=450,height=300,left=${left},top=${top}`);
    
    // Creates the popup content in each virus
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
    myWindow.document.close(); 

    // Schedule the next popup
    randomPopup();
}

function randomPopup() {
    // Generates a random time between 20 and 60 seconds for a popup
    const minTime = 20000;
    const maxTime = 60000; 
    const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    // Set a timeout to show the popup
    setTimeout(showPopup, randomTime);
}


// Call the randomPopup function on window load
// Enable for build
window.onload = randomPopup;
