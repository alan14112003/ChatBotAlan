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
      max_tokens: 100,
      temperature: 0.5,
    })

    return response.data.choices[0].text
  } catch (error) {
    return `có lỗi rồi huhu: ${error}`
  }
} 

export default HandleOpenAI