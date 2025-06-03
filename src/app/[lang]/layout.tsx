import MainProvider from "@/providers/main-provider";

const MultiLangLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ lang: string }> }) => {
    const { lang } = await params

    return (
        <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
            <body>
                <MainProvider>
                    {children}
                </MainProvider>
            </body>
        </html>
    );
};

export default MultiLangLayout;