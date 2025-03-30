

// import OpenAI from "openai";
const OpenAI = require("openai");

const test = () => {

  async function click() {
    const client = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    async function main() {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-4o',
      });
    }

    main();
  }


  return (
    <>
      <button onClick={click}>
        Submit
      </button>
    </>
  );
}

export default test;
