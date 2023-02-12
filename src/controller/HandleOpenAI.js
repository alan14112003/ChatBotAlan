require('dotenv').config()
import { Configuration, OpenAIApi } from 'openai'

// open ai
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY
})
const openAI = new OpenAIApi(configuration)

const HandleOpenAI = async (message) => {
  try {
    const response = await openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 64,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["n"],
    })

    return response.data.choices[0].text
  } catch (error) {
    return `có lỗi rồi huhu: ${error}`
  }
} 

export default HandleOpenAI