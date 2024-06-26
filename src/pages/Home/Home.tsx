// src/Home.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
//css
import './Home.scss';

// components
import PageHeading from '../../components/PageHeading/PageHeading';
import Card from '../../components/Card/Card';

const pageHeadingData = {
    headingLabel: 'Stay On Track with Muscle-Metrics',
    subHeadingLabel: 'Monitor Your Progress Anytime, Anywhere'
}

const cardData = {
    heading: "Monitor Your Progress Anytime, Anywhere",
    button1Label: "Get Started",
    button2Label: "Learn More",
    description: "With Muscle-Metrics, you can easily log your workouts, track your performance, and see real-time progress. Our sleek and intuitive interface ensures that you can focus on what matters most - your training. Access detailed analytics, set personalized goals, and watch as you get closer to your fitness objectives day by day. Muscle-Metrics is your key to consistent and measurable results."
}

const Home: React.FC = () => {

    // state variables
    const navigate = useNavigate();

    // ui methods
    const goToWorkOutPlan = () => {
        navigate("/workout-plan")
    }
    const goToAboutPage = () => {
        navigate("/about")
    }

    return (
        <div className="home-page">
            <PageHeading
                headingLabel={pageHeadingData.headingLabel}
                subheadingLabel={pageHeadingData.subHeadingLabel}
            />
            <Card
                heading={cardData.heading}
                button1Label={cardData.button1Label}
                button2Label={cardData.button2Label}
                description={cardData.description}
                onButton1Click={goToWorkOutPlan}
                onButton2Click={goToAboutPage}
            />
        </div>
    );
};

export default Home;
