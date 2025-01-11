const MobileOptimizedView: React.FC = () => {
  return (
    <div className="md:hidden">
      {/* Mobile-specific UI components */}
      <MobileNavigation />
      <QuickActions />
      <OfflineCapabilities />
    </div>
  );
}; 