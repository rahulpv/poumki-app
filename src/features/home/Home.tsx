import React, { FC } from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Home: FC = () => {
    return (
        <div className="container py-3">

            <Header />

            <div className="container mt-5">
                <div className="row g-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Poumki Assignment</h1>
                        <p className="lead text-muted">This test is intended to evaluate your experience in implementing new technologies, your ability to face issues, your ability to adapt to new tools / projects and your ability to meet the needs described in user stories.</p>

                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default Home;
