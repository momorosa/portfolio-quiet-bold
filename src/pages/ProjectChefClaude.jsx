
export default function ProjectChefClaude({ content }) {
    return (
        <main className="fixed inset-0">
            <h1>Chef Claude — AI-Powered Recipe Creator</h1>
        </main>
    )
}


const Section = ({ children, className = "" }) => {
    return (
        <section className={`max-w-[1024px] mx-auto h-screen p-10 ${className}`}>
            {children}
        </section>
    )
}