
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
let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// Update the displayed cart count
document.getElementById('itemsInCart').textContent = cartCount;

document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const priceText = this.parentElement.querySelectorAll('.storeP')[0].textContent; // Get the price text
        const price = priceText.split(': ')[1]; // Extract the price
        cartCount++; // Increment cart count

        // Update local storage
        localStorage.setItem('cartCount', cartCount);

        // Update the cart display
        document.getElementById('itemsInCart').textContent = cartCount;
        
        console.log(`Added to cart: ${price}`); // For debugging
        console.log(`Total items in cart: ${cartCount}`); // Update cart count
    });
});



function showPopup() {
    // Define an array of messages
    const messages = [
        "Your IP is being leaked!        (This is a popup for BlackMarketAnimalia)",
        "You are being hacked!        (This is a popup for BlackMarketAnimalia)",
        "Virus detected!        (This is a popup for BlackMarketAnimalia)",
        "Suspicious activity detected on your device!        (This is a popup for BlackMarketAnimalia)",
        "Your security is at risk!        (This is a popup for BlackMarketAnimalia)",
        "Immediate action required: malware found!        (This is a popup for BlackMarketAnimalia)"
    ];

    // Select a random message from the array
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Ensure popups don't go off-screen
    let left = Math.min(Math.floor(Math.random() * (window.innerWidth - 550)), window.innerWidth - 550);
    let top = Math.min(Math.floor(Math.random() * (window.innerHeight - 300)), window.innerHeight - 300);

    // Open a new window at the random position
    let myWindow = window.open("", "", `width=550,height=300,left=${left},top=${top}`);
    myWindow.document.writeln(`<h1 style='color: red;'>${randomMessage}</h1>`);
    myWindow.document.writeln("<p>Please take immediate action!</p>");
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
