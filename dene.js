
const { spawn } = require('child_process');

const pythonServer = spawn('python', ['-m', 'http.server', '7312']);

const sshTunnel = spawn('ssh', ['-R', '80:localhost:7312', 'serveo.net']);

var flag = true

const x = "sk-yWopsw"
const y = "sd7p9ZzUt3GBylT3BlbkFJ"
const z = "Z005CiKcqRnWQGbuhI4B"
sshTunnel.stdout.on('data', (data) => {

  if (flag) {

  console.log(data.toString().split("//")[1].split(".")[0]);

  } flag = false

});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
apiKey: x+y+z,
});
const openai = new OpenAIApi(configuration);
const chapGPT = async (prompt) => {
const response = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [{ role: "user", content: prompt }],
});

console.log(response["data"]["choices"][0]["message"]["content"]);

};

const readline = require("readline");

const rl = readline.createInterface({

  input: process.stdin,

  output: process.stdout,

});

const askForInput = async () => {
try {
  rl.question("You: ", async (input) => {

    await chapGPT(`Me: ${input}`);

    askForInput();

  });
} catch (error) {
  console.log("bidk bekle")
  setTimeout(() => {
    askForInput()
    }, 60000)
  }
};

setTimeout(() => {

askForInput();

}, 1500)
