import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface typeofProducts {
    id: number;
    nameBn: string;
    categoryIcon: string;
    today: number;
    unit: string;

    change: {
        dir: string;
        pct: number;
    };
}

const formatUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";

    return unit;
};

const Marquee = async () => {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    const data: typeofProducts[] = await response.json();



    return (
        <div className="flex bg-[#F0F5F0]">
            <MarqueeText direction="right" duration={15}>
                {data.map((post) => {
                   
                   const changeIcon =
                        post.change.dir === "up"
                            ? "🔺"
                            : post.change.dir === "down"
                            ? "▼"
                            : "—";

                    return (
                        <div
                            className="inline-flex items-center gap-1 border-r"
                            key={post.id}
                        >
                            <span>{post.categoryIcon}</span>
                            <span>{post.nameBn}</span>
                            <span>{post.today} {formatUnit(post.unit)}</span>
                            <span>{ changeIcon }</span>
                            
                            <span>{post.change.pct}%</span>
                            <span className="mx-5"></span>
                        </div>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;