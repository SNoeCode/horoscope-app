import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Settings.css";

const colorOptions = [
  { name: "pink", label: "Pink", swatch: "#f472b6" },
  { name: "green", label: "Green", swatch: "#4ade80" },
  { name: "yellow", label: "Yellow", swatch: "#fbbf24" },
  { name: "blue", label: "Blue", swatch: "#60a5fa" },
  { name: "red", label: "Red", swatch: "#f87171" },
];

const Settings = ({ isOpen, onClose }) => {
  const { color, setColor, mode, toggleMode } = useTheme();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose} />
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button className="settings-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="settings-section">
          <h3 className="settings-label">Mode</h3>
          <div className="mode-toggle" onClick={toggleMode}>
            <div className={`mode-option ${mode === "light" ? "active" : ""}`}>
              Light
            </div>
            <div className={`mode-option ${mode === "dark" ? "active" : ""}`}>
              Dark
            </div>
            <div
              className="mode-slider"
              style={{ transform: mode === "dark" ? "translateX(100%)" : "translateX(0)" }}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-label">Color Theme</h3>
          <div className="color-swatches">
            {colorOptions.map((opt) => (
              <button
                key={opt.name}
                className={`color-swatch ${color === opt.name ? "active" : ""}`}
                onClick={() => setColor(opt.name)}
                title={opt.label}
              >
                <span
                  className="swatch-circle"
                  style={{ background: opt.swatch }}
                />
                <span className="swatch-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
