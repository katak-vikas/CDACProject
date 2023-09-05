import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Land.css";

const Land = () => {
  return (
    <>
      <div className="nav-bar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#hero-sec"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#team">
                    Team
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testi">
                    Testimonials
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#featured">
                    Featured
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-container" id="hero-sec">
        <div className="container-fluid ">
          <div className="row d-flex">
            <div className="col align-middle">
              <div className="px-2 py-2">
                <img
                  src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611"
                  className="img-fluid"
                  alt="..."
                />
              </div>
            </div>
            <div className="col">
              <div className="px-5 py-5 mt-5">
                <div className="px-2 py-2 align-middle">
                  <h4>Get all your needs Here</h4>
                  <p>
                    {" "}
                    An online learning and teaching marketplace with over 204000
                    courses and 54 million students. Learn programming,
                    marketing, data science and more.
                  </p>
                </div>
                <div className="px-2 py-2">
                  <button type="button" className="btn btn-outline-primary">
                    Checkout Our Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- main container --> */}
        <div className="main-container">
          <div className="container-fluid">...</div>
        </div>

        {/* <!--  Card container  --> */}
        <div className="card-container bg-black" id="team">
          <div className="container-fluid px-3 py-3">
            <div className="row center mx-4 my-4 text-white">
              <h2>Meet Our Expert</h2>
              <p>Highly professional team</p>
            </div>
            <div className="row mb-5">
              <div className="col">
                <div className="card">
                  <img
                    src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg?w=740&t=st=1667038053~exp=1667038653~hmac=7f51a4d7c9f7dc9e0e3a6d53d45f381fc455e5424bcc36a0bedca65db24487e7"
                    className="card-img-top"
                    style={{ height: "300px" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Martina doena</h5>
                    <p className="card-text">
                      Highly proficient in Web3 and AI and professional in
                      Designing Websites with tools of Web3.0.
                    </p>
                    <a href="#" className="btn org-btn">
                      Learn More.
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg"
                    className="card-img-top"
                    style={{ height: "300px" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Zaid S.</h5>
                    <p className="card-text">
                      A professional web designer with a wealth of knowledge
                      about the web Development and Software Development.{" "}
                    </p>
                    <a href="#" className="btn org-btn">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg?w=740&t=st=1667038099~exp=1667038699~hmac=d144ede4a891a4bfcb57b109cc26614850ed35f5260bbf32541845325c476dbb"
                    className="card-img-top"
                    style={{ height: "300px" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Jhon Doe</h5>
                    <p className="card-text">
                      Expert in all aspects of coding and knowledgeable about a
                      wide range of coding languages
                    </p>
                    <a href="#" className="btn org-btn">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- <div className="aside-container">
  <div className="container-fluid">
 <aside>
<p>The Epcot center is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</aside>
</div>
</div> --> */}

        {/* <!--  testimonals container  --> */}
        <div className="testimonals-container mt-4 mb-4" id="testi">
          <div className="container-fluid">
            <div className="row center mx-4 my-4">
              <h2>What Peoples Say </h2>
              <p>Read our Testimonals</p>
            </div>
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  {/* <!--       <img src="..." className="d-block w-100" alt="..."> --> */}
                  <div className="card-group">
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This card has supporting text below as a natural
                          lead-in to additional content.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This card has
                          even longer content than the first to show that equal
                          height action.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  {/* <!--       <img src="..." className="d-block w-100" alt="..."> --> */}
                  <div className="card-group">
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This card has supporting text below as a natural
                          lead-in to additional content.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This card has
                          even longer content than the first to show that equal
                          height action.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  {/* <!--       <img src="..." className="d-block w-100" alt="..."> --> */}
                  <div className="card-group">
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This card has supporting text below as a natural
                          lead-in to additional content.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This card has
                          even longer content than the first to show that equal
                          height action.
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- overlay box -->
<!--   <div className="mt-5 mx-1">
  <div className="card bg-black text-white ">
  <div className="card-body px-4 py-4">
    
    </div>
   </div>
  </div> --> */}

        {/* <!--  banner container  --> */}
        <div className="banner-container mt-5 mb-5" id="featured">
          <div className="container-fluid px-4 py-4">
            <div className="card bg-black text-white shadow-lg ">
              <h5 className="card-header">Featured Courses</h5>
              <div className="card-body">
                {/* <!--     <h5 className="card-title">Special Teachers for Students</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn org-btn center">Learn More</a> --> */}
                <div className="conatiner">
                  <div className="row d-flex justify-content-around">
                    <div className="col">
                      <div className="card text-black move-up mb-3">
                        <div className="card-header">Web Development</div>
                        <div className="card-body">
                          <h5 className="card-title">Front End + Backend</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          {/* <!--     <a href="#" className="btn btn-outline-primary center">View our curriculum</a> --> */}
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card text-black move-up mb-3">
                        <div className="card-header">Web3.0</div>
                        <div className="card-body">
                          <h5 className="card-title">Web3 and Tools</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card text-black move-up mb-3">
                        <div className="card-header">Java Masterclass</div>
                        <div className="card-body">
                          <h5 className="card-title">Begineer Course</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card text-black move-up mb-3">
                        <div className="card-header">Python </div>
                        <div className="card-body">
                          <h5 className="card-title">Python AI</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- footer --> */}
        <div className="footer-container foot">
          <div className="container-fluid">
            {/* <footer> */}
            <div className="">
              <div className="row">
                <div className="col-md-4 footer-column">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <span className="footer-title">Product</span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Product 1
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Product 2
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Plans & Prices
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Frequently asked questions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 footer-column">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <span className="footer-title">Company</span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Job postings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        News and articles
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 footer-column">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <span className="footer-title">Contact & Support</span>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link">
                        <i className="fas fa-phone"></i>+47 45 80 80 80
                      </span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fas fa-comments"></i>Live chat
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fas fa-envelope"></i>Contact us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fas fa-star"></i>Give feedback
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <i className="fas fa-ellipsis-h"></i>
              </div>

              <div className="row text-center">
                <div className="col-md-4 box">
                  <span className="copyright quick-links">
                    Copyright &copy; Your Website{" "}
                    <script>document.write(new Date().getFullYear())</script>
                  </span>
                </div>
                <div className="col-md-4 box">
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 box">
                  <ul className="list-inline quick-links">
                    <li className="list-inline-item">
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Terms of Use</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Land;
