const counters = [
  { icon: "react_components/img/h-icon-1.png", label: "Established", value: 2001, hasCount: true },
  { icon: "react_components/img/h-icon-2.png", label: "Courses", value: "UG/PG/Ph.D(E&T)", hasCount: false },
  { icon: "react_components/img/h-icon-3.png", label: "Intake", value: 2768, hasCount: true },
  { icon: "react_components/img/h-icon-4.png", label: "Strength", value: 5311, hasCount: true },
];

function CounterSection() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".counter-value[data-count]");
    els.forEach((el) => {
      const update = () => {
        const target = +el.getAttribute("data-count");
        const current = +el.innerText;
        const speed = 20;
        if (current < target) {
          el.innerText = Math.ceil(current + (target - current) / speed);
          setTimeout(update, 40);
        } else {
          el.innerText = target;
        }
      };
      update();
    });
  }, []);

  return (
    <div className="counter-container">
      {counters.map((item, i) => (
        <div className="counter-box" key={i}>
          <img src={item.icon} alt={item.label} className="counter-icon" />
          {item.hasCount ? (
            <div className="counter-value" data-count={item.value}>0</div>
          ) : (
            <div className="counter-value">{item.value}</div>
          )}
          <div className="counter-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.querySelector(".counter-container")).render(<CounterSection />);

