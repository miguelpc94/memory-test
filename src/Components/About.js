import React from "react";
import { Link } from "react-router-dom";
import "..\\about.css";

const About = () => {
	document.body.style.backgroundColor = "#FF851B";
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<br />
				</div>
			</div>
			<div className="row align-items-center">
				<div className="col-md-5 col-xs-12">
					<div className="row align-items-center">
						<div className="col-3">
							<div className="row">
								<div className="col-12">
									<a href="https://www.linkedin.com/in/miguel-castro-2a1972105/">
										<img
											src={process.env.PUBLIC_URL + "/linkedin.png"}
											alt="LinkedIn"
											className="float-right logos"
										/>
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<a href="https://github.com/miguelpc94">
										<img
											src={process.env.PUBLIC_URL + "/github.png"}
											alt="GitHub"
											className="float-right logos"
										/>
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<a href={process.env.PUBLIC_URL + "/resume.pdf"}>
										<img
											src={process.env.PUBLIC_URL + "/pdf.png"}
											alt="Resume"
											className="float-right logos"
										/>
									</a>
								</div>
							</div>
						</div>
						<div className="col-9">
							<img
								src={process.env.PUBLIC_URL + "/me.png"}
								alt="Miguel Castro"
								className="rounded float-left photo"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-7 col-xs-12">
					<p className="top-about-text">
						Hi! I'm Miguel Castro. I'm a software engineer living in London and
						the guy behind this Web App. This is part of my portifolio and you
						can check the code at my{" "}
						<a href="https://github.com/miguelpc94">GitHub</a>. You can also
						download my{" "}
						<a href={process.env.PUBLIC_URL + "/resume.pdf"}>resume</a> or check
						my{" "}
						<a href="https://www.linkedin.com/in/miguel-castro-2a1972105/">
							LinkedIn
						</a>
						. If you need a full-time developer, could use some cool Web Apps or
						know someone who could, get in touch!
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 col-xs-12">
					<div className="go-back-button">
						<Link to="/">back to game</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
