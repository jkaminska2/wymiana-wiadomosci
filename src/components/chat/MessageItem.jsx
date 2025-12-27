export default function MessageItem({ message }) {
    return (
        <li>
            <strong>{message.author}: </strong>{message.text}
        </li>
    );
}