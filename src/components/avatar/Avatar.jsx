import React from "react";
import "../../styles/components/Avatar.scss";

function Avatar({ name, size = 32, status = "online" }) {
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
        <div className="avatar">
            <div className="circle" style={{
                width: size,
                height: size,
                backgroundColor: color,
                fontSize: size * 0.5
            }}>
            {initial}
            </div>
            <span className="status-dot"
                style={{
                    width: size * 0.35,
                    height: size * 0.35,
                    backgroundColor: statusColor,
                }}
            />
        </div>
    );
}

export default React.memo(Avatar);