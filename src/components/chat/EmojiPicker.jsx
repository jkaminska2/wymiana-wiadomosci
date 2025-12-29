import { useEffect, useState } from "react";
import "../../styles/components/EmojiPicker.scss";

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
        <div className="emoji-picker">
            <button type="button" className="emoji-button" onClick={() => setOpen(!open)}>
                🙂
            </button>
            {open && (
                <div className="emoji-panel">
                    {emojiList.map((emoji) => (
                        <span
                            key={emoji.slug}
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