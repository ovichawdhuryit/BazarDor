import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");

    const { name, email, image } = session.user;

    return (
        <div className="flex justify-center py-12 px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                <div className="flex items-center gap-4 mb-6">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-[#05893E] text-white w-16 rounded-full">
                            {image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={image} alt={name} />
                            ) : (
                                <span className="text-2xl">
                                    {name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>

                <Link
                    href="/profile/update"
                    className="btn btn-success text-white"
                >
                    Update Information
                </Link>
            </div>
        </div>
    );
}