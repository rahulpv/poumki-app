import React, {FC, useEffect, useRef} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../../util";
import * as tf from "@tensorflow/tfjs";
tf.enableProdMode();

const Detection: FC = () => {


    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef <HTMLCanvasElement> (null);


    useEffect(() => {
        runCoco();
    }, []);

    // Main function
    const runCoco = async () => {

        const net = await cocossd.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async (net:any) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current?.video?.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            if (canvasRef.current) {

                // Set canvas height and width
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                // Make Detections
                const obj = await net.detect(video);

                // Draw meshrunCoco
                const ctx = canvasRef.current.getContext("2d");
                drawRect(obj, ctx);
            }

        }
    };

    return (
        <div className="container py-3">

            <Header />

            <div className="container mt-5">
                <div className="row g-5">
                    <div className="col-md-12 col-lg-12">
                        <h4 className="mb-3">Live Detection</h4>
                        <div className="row">
                            <Webcam
                                ref={webcamRef}
                                muted={true}
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zIndex: 7,
                                    width: 640,
                                    height: 480,
                                }}
                            />

                            <canvas
                                ref={canvasRef}
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zIndex: 8,
                                    width: 640,
                                    height: 480,
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detection;
