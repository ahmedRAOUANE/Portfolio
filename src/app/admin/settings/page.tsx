const AdminSettingsPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/30">
                <h1 className="text-3xl font-bold text-primary mb-4">Admin Settings</h1>
                <p className="text-light">
                    Manage your application settings here. Configure your portfolio preferences and feature flags.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark/5 p-6 rounded-2xl border border-primary/30 hover:bg-dark/10 transition-all duration-300">
                    <h2 className="text-xl font-semibold text-primary mb-4">Feature Flags</h2>
                    <p className="text-light mb-4">Enable or disable specific features of your portfolio.</p>
                    {/* Feature flags component will go here */}
                </div>

                <div className="bg-dark/5 p-6 rounded-2xl border border-primary/30 hover:bg-dark/10 transition-all duration-300">
                    <h2 className="text-xl font-semibold text-primary mb-4">General Settings</h2>
                    <p className="text-light mb-4">Configure general settings for your portfolio.</p>
                    {/* General settings component will go here */}
                </div>
            </div>
        </div>
    );
}

export default AdminSettingsPage;