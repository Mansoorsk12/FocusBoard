import { Check, Clock, List } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";

function StatCard({ tone, icon: Icon, label, value, caption, pill, className }) {
  return (
    <article className={`kpi ${className || ""}`}>
      <span className={`kpi-icon ${tone}`} aria-hidden="true">
        <Icon size={19} />
      </span>
      <h3 className="kpi-label">{label}</h3>
      <div className="kpi-value">{value}</div>
      <div className="kpi-caption">{caption}</div>
      {pill && (
        <span className="kpi-pill" aria-label={`${pill} of tasks completed`}>
          {pill}
        </span>
      )}
    </article>
  );
}

// Every number comes from the tasks array (see getStatistics in taskHelpers.js).
export default function OverviewCards() {
  const { statistics } = useTasks();
  return (
    <section aria-labelledby="overview-heading" className="overview">
      <h2 id="overview-heading" className="overview-title">
        Overview
      </h2>
      <div className="kpis">
        <StatCard
          tone="violet"
          icon={List}
          label="Total tasks"
          value={statistics.total}
          caption="Across all projects"
        />
        <StatCard
          tone="blue"
          icon={Clock}
          label="In progress"
          value={statistics.inProgress}
          caption="Keep the momentum"
          className="kpi-progress"
        />
        <StatCard
          tone="green"
          icon={Check}
          label="Completed"
          value={statistics.completed}
          caption="Great work this week"
          pill={`${statistics.percentage}%`}
        />
      </div>
    </section>
  );
}