import React, { useEffect, useState, useCallback } from "react";
import "../../styles/components/EmojiPicker.scss";

function EmojiPicker({ onSelect }) {
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
    const toggleOpen = useCallback(() => {
        setOpen(prev => !prev);
    }, []);
    const handleSelect = useCallback((emoji) => {
        onSelect(emoji);
        setOpen(false)
    },[onSelect]);
    return (
        <div className="emoji-picker">
            <button type="button" className="emoji-button" onClick={toggleOpen}>
                🙂
            </button>
            {open && (
                <div className="emoji-panel">
                    {emojiList.map((emoji) => (
                        <span
                            key={emoji.slug}
                            onClick={() => handleSelect(emoji.character)}
                        >
                            {emoji.character}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default React.memo(EmojiPicker);