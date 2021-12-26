import React from "react";

const Section = ({bookPass, passes}) => {
  const bookHandler = (index) => {
   bookPass(index);
  };

  return (
    <section className="content">
      {/* MAIN VIDEO BACKGROUND */}
      <div className="main-video">
        <div className="image-background"></div>
        <div className="image-title">
          <p>Book your night event</p>
          <p> on the celo blokchain</p>
        </div>
        <div className="video-background">
          <video autoPlay muted loop id="myVideo">
            <source src="img/concert-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="table-events">
        <div className="container">
          <div className="the-title text-center" data-aos="fade-up">
            <h5 className="head-title-2"> / EVENTS </h5>
            <h2 className="head-title-1">
              {" "}
              Upcoming Event
              <span className="title-end">.</span>
            </h2>
            <p className="dugem-text">Book your event</p>
          </div>
          <table className="event">
            <tbody>
              <tr>
                <td>Table</td>
                <td className="event-thumb-head" />
                <td>Event</td>
                <td>Ticket</td>
              </tr>
              <tr className="space">
                <td>&nbsp;</td>
              </tr>
              {passes.map((pass) => (
                <React.Fragment>
                  <tr>
                    <td className="event-date">{pass.table}</td>
                    <td className="event-thumb">
                      <a href="single-event.html">
                        <img
                          width={70}
                          height={100}
                          src={pass.imageURL}
                          alt="table-1"
                        />
                      </a>
                    </td>
                    <td className="event-title">
                      <a href="single-event.html">{pass.eventName}</a>
                    </td>
                    <td className="event-ticket-link">
                      <a
                        href="#"
                        onClick={() => bookHandler(pass.index)}
                        className="button button-white rsvp"
                      >
                        BOOK
                      </a>
                    </td>
                  </tr>
                  <tr className="space">
                    <td>&nbsp;</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="event-mobile">
            <ul className="event-list">
              {passes.map((pass) => (
                <li>
                  <span className="img-thumb">
                    <a href="single-event.html">
                      <img
                        width={70}
                        height={100}
                        src={pass.imageURL}
                        alt="table-1-1"
                      />
                    </a>
                  </span>
                  <p>
                    <span>Table :</span> <a href="#">{pass.table}</a>
                  </p>
                  <p>
                    <span>Event :</span> <a href="#">{pass.eventName}</a>
                  </p>
                  <p>
                    <a href="#" onClick={() => bookHandler(pass.index)} className="button-basic-1">
                      BUY PASS
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
