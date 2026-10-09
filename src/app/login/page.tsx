import LoginForm from "./LoginForm";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ exists?: string }>;
}) {
    const { exists } = await searchParams;
    return <LoginForm alreadyExists={exists === "1"} />;
}