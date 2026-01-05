import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ConsumerRightsArticle from "./articles/ConsumerRights";
import PropertyRentArticle from "./articles/PropertyRent";
import CyberCrimeArticle from "./articles/CyberCrime";
import WomensSafetyArticle from "./articles/WomensSafety";
import ArrestBailArticle from "./articles/ArrestBail";
import FIRArticle from "./articles/FIR";
import BNSArticle from "./articles/BNS";
import PrivacyRightsArticle from "./articles/PrivacyRights";

const LegalArticleRouter: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const articleComponents: Record<string, React.FC> = {
        "consumer-rights": ConsumerRightsArticle,
        "property-rent": PropertyRentArticle,
        "cyber-crime": CyberCrimeArticle,
        "womens-safety": WomensSafetyArticle,
        "arrest-bail": ArrestBailArticle,
        "fir": FIRArticle,
        "bns-2024": BNSArticle,
        "privacy-rights": PrivacyRightsArticle
    };

    const ArticleComponent = slug ? articleComponents[slug] : null;

    if (!ArticleComponent) {
        return <Navigate to="/nyaya-gyan" replace />;
    }

    return <ArticleComponent />;
};

export default LegalArticleRouter;
