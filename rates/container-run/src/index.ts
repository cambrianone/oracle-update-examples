const run = async () => {
  const apiKey = process.env.AV_API_KEY;
  const avFunction = process.env.AV_FUNCTION ?? 'BRENT';
  if (!apiKey) {
    console.error('AV_API_KEY not provided');
    process.exit(1);
  }
  const url = `https://www.alphavantage.co/query?function=${avFunction}&interval=daily&apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Request failed with status', res.status);
    process.exit(1);
  }
  const data = await res.json();
  try {
    console.log(data.data[0].value);
  } catch (e) {
    console.error('Error parsing response', e);
    process.exit(1);
  }
}

run().catch(e => {
  console.error('Error', e);
  process.exit(1);
})
