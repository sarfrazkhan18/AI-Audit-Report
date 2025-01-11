const ComplianceTracker: React.FC = () => {
  return (
    <div>
      {/* Regulatory requirements */}
      <RegulationsList />
      
      {/* Compliance status */}
      <ComplianceChecklist />
      
      {/* Due dates & reminders */}
      <ComplianceCalendar />
    </div>
  );
}; 