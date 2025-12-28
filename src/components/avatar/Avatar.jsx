export default function Avatar({ name, size = 32, status = "online" }) {
    const initial = name.charAt(0).toUpperCase();
    const colors = ["#FF6B6B", "#4ECDC4", "#556270", "#C7F464", "#78E193ff", "#4A90E2"];
    const color = colors[name.charCodeAt(0) * name.length % colors.length];
    const statusColors = {
        "dostępny": "#4CAF50",
        "zaraz wracam": "#FFC107",
        "niedostępny": "#F44336"
    };
    const statusColor = statusColors[status] || "#9E9E9E";
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: size * 0.5,
                marginRight: "10px"
            }}>
            {initial}
            </div>
            <span 
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: size * 0.35,
                    height: size * 0.35,
                    backgroundColor: statusColor,
                    borderRadius: "50%",
                    border: "2px solid white"
                }}
            />
        </div>
    );
}