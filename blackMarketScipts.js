async function generateImage(retries = 3, delay = 2000) {
    const url = "https://modelslab.com/api/v6/images/text2img";
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

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the entire response for debugging
            
            // Access the output array and get the first image URL
            if (data.output && data.output.length > 0) {
                const imageUrl = data.output[0]; // Get the image URL from the output array

                const generatedImage = document.getElementById('generated1');
                const parentElement = generatedImage.parentElement; 
                
                generatedImage.src = imageUrl; // Set the image source
                generatedImage.style.display = 'block'; // Show the image
                parentElement.style.display = 'block'; // Show the parent element
            } else {
                console.error("Image not found in the response.", data);
                alert("Unable to generate image. Please try again."); // Notify the user
            }
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            await new Promise(res => setTimeout(res, delay)); // Wait for specified delay
            return generateImage(retries - 1, delay); // Retry the function
        } else {
            alert("Failed to generate image after multiple attempts. Please try again later."); // Notify the user
        }
    }
    
    // Call to generate text after the image generation attempt
    generateText();
}
async function generateText() {
    const url = 'https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles?category=short%20description%20of%20a%20crazy%20animal';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '736245e896mshfb15eb128512e4bp13fe27jsnf4b1d2d97eee',
            'x-rapidapi-host': 'contentai-net-text-generation.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (response.ok) {
            const result = await response.json(); // Parse JSON response
            
            // Extract the text part starting from "text:"
            const text = result.text;
            const startIndex = text.indexOf("text:") + 5; // Start after "text:"
            const textSubstring = text.substring(startIndex).trim(); // Extract substring

            // Find the first two periods and cut the text there
            const firstPeriodIndex = textSubstring.indexOf('.') + 1; // First period
            const secondPeriodIndex = textSubstring.indexOf('.', firstPeriodIndex) + 1; // Second period
            const thirdPeriodIndex = textSubstring.indexOf('.', secondPeriodIndexPeriodIndex) + 1; // Third period

            // Cut off after the second period
            const limitedText = thirdPeriodIndex !== -1 ? textSubstring.substring(firstPeriodIndex, thirdPeriodIndex).trim() : textSubstring;

            console.log(limitedText); // Log the limited text for debugging
            
            // Update the paragraph with id 'generatedText1' with the processed text
            const generatedTextElement = document.getElementById('generatedText1');
            generatedTextElement.textContent = limitedText; // Set the text content
            generatedTextElement.style.display = 'block'; // Show the paragraph
        } else {
            console.error("Error fetching text:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}



// Call the function on button press
document.getElementById('generateButton').addEventListener('click', generateImage);
