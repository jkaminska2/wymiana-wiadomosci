export async function fetchBotReply(id) {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const json = await res.json();
    if (!json?.setup || !json?.punchline) {
        return "I can't think of a joke right now."
    }
    return `${json.setup} - ${json.punchline}`;
}
