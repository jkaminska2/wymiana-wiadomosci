import { useEffect, useState } from "react";

export default function EmojiPicker({ onSelect }) {
    const [emojiList, setEmojiList] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        async function loadEmoji() {
            try {
                const res = await fetch("https://emoji-api.com/emojis?access_key=a4848fbf9178f5dc1bc8dc8782d7882cccdbacbb");
                const data = await res.json();
                setEmojiList(data.slice(0,100));
            } catch (err) {
                console.error("Błąd pobierania emoji:", err);
            }
        }
        loadEmoji();
    }, []);
    return (
        <div style={{ position: "relative" }}>
            <button type="button" onClick={() => setOpen(!open)}>
                🙂
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        left: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "10px",
                        width: "200px",
                        height: "150px",
                        overflowY: "scroll",
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: "5px",
                        zIndex: 10
                    }}
                >
                    {emojiList.map((emoji) => (
                        <span
                            key={emoji.slug}
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                                onSelect(emoji.character);
                                setOpen(false);
                            }}
                        >
                            {emoji.character}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}