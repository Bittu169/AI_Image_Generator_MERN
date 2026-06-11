// test.js
import dns from "dns";

dns.lookup("api-inference.huggingface.co", (err, address) => {
  console.log(err);
  console.log(address);
});