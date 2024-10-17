// I decided to have it retry 3 times just in case 1 fails, and I added a delay so that it waits for the prompt to complete.
async function generateImage(retries = 3, delay = 2000) {
    // This is the url for the api
    const url = "https://modelslab.com/api/v6/images/text2img";
    // This is the payload that they want me to use, I use the prompt and negative prompt to generate a prompted image. 
    const payload = {
        key: "fAOgszo9xJVYssy7sfsteGmZnuF0N82de1oZ880rEsyBZneMu66FrHj3n0N8",
        model_id: "dreamshaper-v8",
        prompt: "ultra realistic portrait of a bizarre, fantastical creature with exaggerated features, bad anatomy, bad proportions, wild colors, extra limbs, mutated features, large expressive eyes, mix of animals, hyper detail, 8K, RAW, unedited, symmetrical balance",
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
            
            // Access the output array and get the first image URL
            if (data.output && data.output.length > 0) {
                // Get the image URL from the output array
                const imageUrl = data.output[0]; 
                const generatedImage = document.getElementById('generated1');  // This element is what will be replaced by the AI image

                const parentElement = generatedImage.parentElement;  // This parent element is assigned so that it can be no longer hidden
                
                generatedImage.src = imageUrl; // Set the image source
                generatedImage.style.display = 'fixed'; // Show the image
                parentElement.style.display = 'block'; // Show the parent element
                document.getElementById('generateButton1').style.display="hidden"; // Hide the generate button image after click so that it doesn't cause more api calls 

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
    generateText();
}

// Function for generating the AI text for the image. 
// It is set up similarly to the other API call
async function generateText() {
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
            const thirdPeriodIndex = textSubstring.indexOf('.', secondPeriodIndexPeriodIndex) + 1; // Third period

            // Cut off after the second period
            const limitedText = thirdPeriodIndex !== -1 ? textSubstring.substring(firstPeriodIndex, thirdPeriodIndex).trim() : textSubstring;

            console.log(limitedText); // Log the limited text for debugging
            
            // Update the paragraph with id 'generatedText1' with the processed text
            const generatedTextElement = document.getElementById('generatedText1');
            generatedTextElement.textContent = limitedText; // Set the text content
            generatedTextElement.style.display = 'block'; // Show the paragraph after generation
        } else {
            console.error("Error fetching text:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function on button press to generate the image, after image generation, it calls text generation. 
document.getElementById('generateButton1').addEventListener('click', generateImage);
