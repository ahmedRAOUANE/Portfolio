const AdminProjectsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
            <h1 className="text-4xl-bold mb-6 text-primary">Admin Projects</h1>
            <p className="text-md text-foreground-light mb-8">
                Manage your projects here.
            </p>

            <form className="w-full max-w-2xl p-6 flex flex-col gap-6">
                <div>
                    <label
                        htmlFor="projectName"
                        className="hidden"
                    >
                        Project Name
                    </label>
                    <input
                        placeholder="Project Name"
                        type="text"
                        id="projectName"
                        name="projectName"
                        required
                        className="w-full p-2 rounded-lg text-foreground bg-dark"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="hidden"
                    >
                        Description
                    </label>
                    <textarea
                        placeholder="description"
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full p-2 bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="link"
                        className="hidden"
                    >
                        Link/URL
                    </label>
                    <input
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full p-2 bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="image"
                        className="hidden"
                    >
                        Image
                    </label>
                    <input
                        placeholder="Project Image"
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        className="w-full p-2 bg-dark rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-dark file:bg-light file:text-dark hover:file:bg-secondary-light cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-primary rounded-lg cursor-pointer"
                >
                    Save Project
                </button>
            </form>
        </div>
    );
};

export default AdminProjectsPage;