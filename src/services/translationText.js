import API from "./api";

export const translateText = async (originalText, targetLanguage) => {
	try {
		console.log("Translation API request payload:", {
			text: originalText,
			target_language: targetLanguage,
			source_language: "en",
		});

		const response = await API.post("/api/v1/translation/", {
			text: originalText,
			target_language: targetLanguage,
			source_language: "en",
		});

		console.log("Translation API response:", response); // Log full response for debugging
		console.log("Translation API response data:", response.data);

		// Added validation for response structure
		if (response.data && response.data.translated_text) {
			return response.data.translated_text;
		} else {
			console.warn("Unexpected response structure:", response.data);
			return originalText; // Fallback to original text
		}
	} catch (error) {
		console.error("Translation error details:", {
			message: error.message,
			response: error.response?.data, // Log server error response
			status: error.response?.status, // Log HTTP status code
		});

		// Return original text as fallback
		return originalText;
	}
};
