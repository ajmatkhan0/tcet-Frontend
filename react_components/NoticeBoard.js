const { useState, useEffect } = React;

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [archivedNotices, setArchivedNotices] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    fetch("https://wholesome-upliftment-production.up.railway.app/notices")

      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  function fetchArchived() {
    fetch("https://wholesome-upliftment-production.up.railway.app/notices/archived")
      .then((res) => res.json())
      .then((data) => {
        setArchivedNotices(data);
        setShowArchive(true);
      })
      .catch((err) => console.error("Error fetching archived:", err));
  }

  const toggleScroll = () => setIsPaused((prev) => !prev);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const month = date.toLocaleDateString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return (
      <>
        {day}
        <sup>{suffix}</sup> {month} {year}
      </>
    );
  }

  function isNew(uploadTime) {
    const today = new Date();
    const date = new Date(uploadTime);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  return (
    <>
      <div className="vmg-card">

        {/* HEADER */}
        <div className="notice-header">
          <img src="images/updates-icon-1.png" className="new-gif-icon" />
          Notices & Circulars

          {/* Scroll Button */}
          <button className="scroll-btn" onClick={toggleScroll}>
            {isPaused ? "▶️" : "⏸️"}
          </button>
        </div>

        {/* SCROLLING NOTICE LIST */}
        <div
          id="scrollContainer1"
          className={`scroll-container ${isPaused ? "paused" : ""}`}
        >
          <ul className="scroll-list-1">
            {notices.map((notice) => (
              <li key={notice.id}>
                {/* DATE */}
                <div className="notice-date">{formatDate(notice.noticeDate)}</div>

                {/* TITLE */}
                <a href={notice.noticeLink} target="_blank">
                  {notice.noticeTitle}

                  {isNew(notice.uploadTime) && (
                    <img src="image/new.gif" style={{ marginLeft: "6px" }} />
                  )}
                </a>

                {/* DEADLINE */}
                {notice.deadline && (
                  <div
                    className="deadline"
                    style={{
                      fontSize: "12px",
                      color: "#d9534f",
                      marginTop: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    ⏰ Deadline: {formatDate(notice.deadline)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ARCHIVE BUTTON AT BOTTOM */}
        <div className="archive-footer">
          <button className="archive-btn" onClick={fetchArchived}>
            🗂️ View Archived Notices
          </button>
        </div>

      </div>

      {/* ARCHIVE POPUP MODAL */}
      {showArchive && (
        <div className="archive-modal" style={modalStyle}>
          <div style={modalBoxStyle}>
            <h2>Archived Notices</h2>

            <button onClick={() => setShowArchive(false)} style={closeBtnStyle}>
              ✖ Close
            </button>

            <ul
              className="scroll-list-1"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {archivedNotices.map((notice) => (
                <li key={notice.id}>
                  <div className="notice-date">{formatDate(notice.noticeDate)}</div>
                  <a href={notice.noticeLink} target="_blank">
                    {notice.noticeTitle}
                  </a>

                  {notice.deadline && (
                    <div style={{ fontSize: "12px", color: "#d9534f" }}>
                      ⏰ Deadline: {formatDate(notice.deadline)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

/* MODAL STYLES */
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalBoxStyle = {
  background: "#fff",
  padding: "20px",
  width: "450px",
  borderRadius: "10px",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#d9534f",
  color: "#fff",
  border: "none",
  padding: "4px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

const root = ReactDOM.createRoot(document.getElementById("notice-root"));
root.render(<NoticeBoard />);
