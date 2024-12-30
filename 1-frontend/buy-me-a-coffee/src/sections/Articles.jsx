import { Element } from "react-scroll";
import { articles } from "../constants/index.jsx";
import ArticlesItem from "../components/ArticlesItem.jsx";

const Articles = () => {
    const halfLength = Math.floor(articles.length / 2);

    return (
        <section>
            <Element name="articles" className="relative">
                <div className="container relative z-2 py-28">
                    <div>
                        <h3 className="h3 max-md:h5 max-w-640 max-lg:max-w-md mb-7 text-p4">
                            Brewing Knowledge, <br />One Article at a Time
                        </h3>
                        <p className="body-1 max-lg:max-w-sm">
                            From beginners to builders, explore a collection of insights to inspire your Web3 journey.
                        </p>
                    </div>

                    <div className="articles-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-s2" />
                </div>

                <div className="articles-glow_before relative z-2 border-2 border-s2 bg-s1">
                    <div className="container flex gap-10 max-lg:block">
                        <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 border-s2 bg-s1">
                            <img src="/images/articles-logo.svg" alt="logo" className="size-1/2" />
                        </div>

                        <div className="relative flex-1 pt-24">
                            {articles.slice(0, halfLength).map((item, index) => (
                                <ArticlesItem key={item.id} item={item} index={index} />
                            ))}
                        </div>

                        <div className="relative flex-1 lg:pt-24">
                            {articles.slice(halfLength).map((item, index) => (
                                <ArticlesItem key={item.id} item={item} index={halfLength + index} />
                            ))}
                        </div>
                    </div>

                    <div className="articles-lin_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-s2 max-lg:hidden" />
                </div>
            </Element>
        </section>
    );
};

export default Articles;