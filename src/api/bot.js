export async function fetchBotReply() {
    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!res.ok) {
            return "Nie umiem opowiedzieć żartu.";
        }
        const json = await res.json();
        if (!json?.setup || !json?.punchline) {
            return "Nie znam żadnego żartu.";
        }
        return `${json.setup} - ${json.punchline}`;
    } catch (err) {
        return "Nie mogę ci teraz odpowiedzieć.";
    }
}